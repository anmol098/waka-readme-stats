import os
import re
import argparse
import sys
from openai import OpenAI

# 1. Config
LANG_MAP = {
    "de": "German", "fr": "French", "es": "Spanish", "ja": "Japanese",
    "zh": "Chinese(Simplified)", 
    "ru": "Russian", "pt": "Portuguese", "ko": "Korean", "hi": "Hindi",
    # Not fully checked
    "ar": "Arabic", "cs": "Czech", "nl": "Dutch", "en": "English",
    "el": "Greek", "he": "Hebrew", "id": "Indonesian", "it": "Italian",
    "fa": "Persian", "pl": "Polish", "ro": "Romanian", "tr": "Turkish",
    "uk": "Ukrainian", "vi": "Vietnamese", "zh-tw": "Chinese(Traditional)",
}

parser = argparse.ArgumentParser()
parser.add_argument("--lang", type=str, required=True)
args = parser.parse_args()
target_lang_name = LANG_MAP.get(args.lang, "English")

# 1. Config and Argument Parsing

lang_guidance = ""
scripts_dir = "scripts"
guidance_file = os.path.join(scripts_dir, f"{args.lang}.txt")

if os.path.exists(guidance_file):
    with open(guidance_file, "r", encoding="utf-8") as f:
        lang_guidance = f.read().strip()
    print(f"[INFO] Injected language-specific guidance from {guidance_file}")
else:
    print(f"[INFO] No specific guidance found for '{args.lang}', using global defaults.")



client = OpenAI(base_url="http://localhost:5432/v1", api_key="lm-studio")

# 2. Chunking

def get_smart_chunks(text):
    pattern = r'(' \
              r'```[\s\S]*?```|' \
              r'<div\b[^>]*>[\s\S]*?<\/div>|' \
              r'<details\b[^>]*>[\s\S]*?<\/details>|' \
              r'^#{1,6} .*' \
              r')'

    raw_parts = re.split(pattern, text, flags=re.MULTILINE | re.IGNORECASE)
    chunks = []

    for part in raw_parts:
        if not part or not part.strip():
            continue

        p = part.strip()

        # Treat GitHub-style admonition tokens like [!NOTE], [!IMPORTANT] as struct
        if re.search(r'\[![^\]]+\]', p):
            chunks.append(("struct", p))
            continue

        if p.startswith('>') or p.startswith('*') or p.endswith('*') or p.startswith('> *') or p.startswith(' *'):
            chunks.append(("prose", p))
            continue
        
        if (
            p.startswith(('<div', '<details', '```')) or
            p.startswith('<!--') or p.endswith('-->') or
            re.match(r'!\[.*?\]\(.*?\)', p) or
            re.match(r'\[.*?\]\(.*?\)', p)
        ):
            chunks.append(("struct", p))
        else:
            chunks.append(("prose", p))

        # Ensure any struct chunks containing blockquotes are split
    try:
        return split_struct_blockquotes(chunks)
    except NameError:
        return chunks



def merge_small_chunks(chunks, min_chars=400):
    merged = []
    i = 0
    while i < len(chunks):
        ctype, ctext = chunks[i]
        
        if ctype == "prose" and (ctext.startswith('#') or len(ctext) < 50) and i + 1 < len(chunks):
            next_ctype, next_ctext = chunks[i+1]
            combined_text = ctext + "\n\n" + next_ctext
            
            # If we swallowed a struct, call it a hybrid
            new_type = "hybrid" if next_ctype == "struct" else "prose"
            merged.append((new_type, combined_text))
            i += 2 
        else:
            merged.append((ctype, ctext))
            i += 1
    return merged

def _classify_text_as_struct_or_prose(text):
    t = text.strip()
    if (
        t.startswith(('<div', '<details', '```')) or
        t.startswith('<!--') or t.endswith('-->') or
        re.match(r'!\[.*?\]\(.*?\)', t) or
        re.match(r'\[.*?\]\(.*?\)', t) or
        re.search(r'\[![^\]]+\]', t)
    ):
        return 'struct'
    return 'prose'


def split_struct_blockquotes(chunks):
    """Split any `struct` chunk that contains a markdown blockquote into
    a `struct` part before the quote, a `prose` blockquote part, and an
    optional tail (struct/prose) after. This handles cases where placeholders
    like <!-- HTML_BLOCK --> are adjacent to a quoted one-line description.
    """
    out = []
    for ctype, ctext in chunks:
        if ctype != 'struct' or not re.search(r'^\s*>', ctext, flags=re.MULTILINE):
            out.append((ctype, ctext))
            continue

        # Work with original lines to preserve spacing
        lines = ctext.splitlines(True)

        # find first line that starts with '>' (block quote)
        start = None
        for idx, line in enumerate(lines):
            if line.lstrip().startswith('>'):
                start = idx
                break

        if start is None:
            out.append((ctype, ctext))
            continue

        # find end of contiguous blockquote region, include adjacent blank lines
        end = start
        while end + 1 < len(lines):
            nxt = lines[end + 1]
            if nxt.lstrip().startswith('>'):
                end += 1
                continue
            # include a single blank line immediately after blockquote
            if nxt.strip() == '':
                # only include if followed by another blockquote line
                if end + 2 < len(lines) and lines[end + 2].lstrip().startswith('>'):
                    end += 1
                    continue
                # otherwise, treat blank as separator and stop
                break
            break

        before = ''.join(lines[:start]).strip()
        block = ''.join(lines[start:end+1]).strip()
        after = ''.join(lines[end+1:]).strip()

        # If the blockquote begins with a GitHub-style admonition token
        # like `[!NOTE]` or a localized variant (e.g., `[!WICHTIG]`),
        # treat the entire blockquote as `struct` so it is preserved
        # and not converted to a `prose` block for translation.
        first_bq_line = lines[start].lstrip()
        is_admonition_bq = bool(re.match(r'>\s*\[![^\]]+\]', first_bq_line)) or bool(re.search(r'\[![^\]]+\]', block))

        if before:
            out.append(('struct', before))

        if is_admonition_bq:
            out.append(('struct', block))
        else:
            out.append(('prose', block))

        if after:
            out.append((_classify_text_as_struct_or_prose(after), after))

    return out


def fix_relative_paths(text):
    # Matches Markdown links [text](path)
    # Ignores http, /, #, and already existing ../
    text = re.sub(r'(\[.*?\]\()(?!(?:http|/|#|\.\./))', r'\1../', text) 
    
    # Matches HTML attributes src="path" or href="path"
    text = re.sub(r'((?:src|href)=["\'])(?!(?:http|/|#|\.\./))', r'\1../', text)
    
    return text

# The regex used to capture complex "tree" structures (div/details) as single chunks
pattern = r'(' \
          r'```[\s\S]*?```|' \
          r'<(div|details|section|table)\b[^>]*>[\s\S]*?<\/\2>|' \
          r'^#{1,6} .*' \
          r')'


FORBIDDEN = [
    # English
    "This section", "In this", "In this section", "means", "explains",
    # Chinese (Simplified)
    "以下", "说明", "本节", "在这里", "意味着", "解释",
    # German
    "Dieser Abschnitt", "In diesem", "In diesem Abschnitt", "bedeutet", "erklärt",
    # French
    "Cette section", "Dans cette", "Dans cette section", "signifie", "explique",
    # Spanish
    "Esta sección", "En esta", "En esta sección", "significa", "explica",
    # Japanese
    "このセクション", "この中で", "このセクションでは", "意味する", "説明する", "顔を赤らめる",
    # Russian
    "Этот раздел", "В этом", "В этом разделе", "означает", "объясняет", "ниже",

    # Arabic
    "هذا القسم", "في هذا", "في هذا القسم", "يعني", "يشرح",

    # Czech
    "Tato sekce", "V tomto", "V této sekci", "znamená", "vysvětluje",

    # Dutch
    "Deze sectie", "In dit", "In deze sectie", "betekent", "verklaart",

    # Greek
    "Αυτό το τμήμα", "Σε αυτό", "Σε αυτό το τμήμα", "σημαίνει", "εξηγεί",

    # Hebrew
    "סעיף זה", "בזה", "בסעיף זה", "משמעותו", "מסביר",

    # Indonesian
    "Bagian ini", "Dalam ini", "Di bagian ini", "berarti", "menjelaskan",

    # Italian
    "Questa sezione", "In questo", "In questa sezione", "significa", "spiega",

    # Persian (Farsi)
    "این بخش", "در این", "در این بخش", "معنی می‌دهد", "توضیح می‌دهد",

    # Polish
    "Ta sekcja", "W tym", "W tej sekcji", "oznacza", "wyjaśnia",

    # Romanian
    "Această secțiune", "În acest", "În această secțiune", "înseamnă", "explică",

    # Turkish
    "Bu bölüm", "Bunda", "Bu bölümde", "anlamına gelir", "açıklar",

    # Ukrainian
    "Цей розділ", "У цьому", "У цьому розділі", "означає", "пояснює",

    # Vietnamese
    "Phần này", "Trong này", "Trong phần này", "có nghĩa là", "giải thích",

    # Traditional Chinese
    "以下", "說明", "本節", "在這裡", "意味著", "解釋",
    # Portuguese
    "Esta seção", "Nesta seção", "significa", "explica",
    # Korean
    "이 섹션", "이 안에서", "이 섹션에서는", "의미한다", "설명한다",
    # Hindi
    "यह अनुभाग", "इसमें", "इस अनुभाग में", "का अर्थ है", "समझाता है", "चिड़िया",
]

# 3. Prompt
SYSTEM_HEADER = (
    f"You are a technical translation filter for {target_lang_name}.\n"
    "STRICT RULES:\n"
    "- The input is a single section header. Translate it 1:1.\n"
    "- DO NOT generate any content, lists, or descriptions under the header.\n"
    "- Preserve the '#' symbols exactly.\n"
    "- Output ONLY the translated header.\n"
    "- Preserve original formatting, punctuation, whitespace, and markdown/code symbols exactly; do NOT normalize, reflow, or 'fix' the input."
)

SYSTEM_PROSE = (
    f"You are a professional technical translation engine. "
    f"Your task: Translate the input into {target_lang_name}.\n"
    "STRICT RULES:\n"
    "- Output ONLY the final translated text. No intros, no 'Here is the translation'.\n"
    "- Translate human text inside HTML tags (e.g., <summary>Source</summary> -> <summary>Translation</summary>).\n"
    "- NEVER modify HTML tags, attributes (href, src), or CSS styles.\n"
    "- NEVER translate or reformat numbers, units (hrs, mins, sec), or timestamps. Treat them as immutable code.\n"
    "- Keep technical terms (GPU, VRAM, CLI, Docker, GEMM, PIDs, NVLink) in English.\n"
    "- Preserve all Markdown symbols (#, > *, **, `, -, [link](url)) exactly.\n"
    "- Do NOT modify formatting, whitespace, punctuation, code fences, list markers, or emphasis markers; translate only the human-visible text and leave surrounding symbols unchanged.\n"
    "- Preserve original formatting, punctuation, whitespace, and markdown/code symbols exactly; do NOT normalize, reflow, or 'fix' the input."
)

# 4. Main

def main():
    with open("README.md", "r", encoding="utf-8") as f:
        content = f.read()

    # Compute raw chunks, then split any struct chunks that contain blockquotes
    chunks = get_smart_chunks(content)
    chunks = split_struct_blockquotes(chunks)
    chunks = merge_small_chunks(chunks)

    final_output = []

    # Precompute multiplier map once
    high_multiplier_map = {
        "ja": 5.5,  # Japanese can expand a lot
        "hi": 5.5,  # Hindi often requires more tokens
        "ar": 4.0,  # Arabic often expands moderately
        "he": 4.0,  # Hebrew
        "fa": 4.0,  # Persian (Farsi)
        "ru": 3.5,  # Russian
        "uk": 3.5,  # Ukrainian
        "pl": 3.5,  # Polish
    }

    for i, (ctype, ctext) in enumerate(chunks):
        if ctype == "struct":
            final_output.append(ctext + "\n\n")
            continue

        # Check if the chunk is just a header (Starts with # and has no newlines)
        is_lone_header = ctext.strip().startswith('#') and "\n" not in ctext.strip()

        # Select the prompt based on context
        current_system_prompt = SYSTEM_HEADER if is_lone_header else SYSTEM_PROSE
        if lang_guidance and not is_lone_header:
            current_system_prompt = f"{SYSTEM_PROSE}\n\nADDITIONAL GUIDANCE:\n{lang_guidance}"

        # Streaming call: print the original chunk and stream incremental translation
        print(f"\n--- CHUNK {i+1} ({ctype}) ---")
        print(ctext)
        print("--- STREAMED TRANSLATION ---")
        sys.stdout.flush()

        translated_accum = ""
        stream_ok = True
        try:
            # Use create with stream=True for standard iteration
            stream_iter = client.chat.completions.create(
                model="aya-expanse-8b",
                messages=[
                    {"role": "system", "content": current_system_prompt},
                    {"role": "user", "content": ctext}
                ],
                temperature=0,
                stream=True,
            )

            for evt in stream_iter:
                # evt can be an object or a dict depending on SDK; try several access patterns
                delta = None
                try:
                    delta = getattr(evt.choices[0].delta, "content", None)
                except Exception:
                    try:
                        delta = evt.choices[0].delta.get("content")
                    except Exception:
                        try:
                            delta = evt.get("choices")[0].get("delta", {}).get("content")
                        except Exception:
                            delta = None

                if not delta:
                    try:
                        delta = getattr(evt.choices[0].message, "content", None)
                    except Exception:
                        try:
                            delta = evt.choices[0].get("message", {}).get("content")
                        except Exception:
                            pass

                if delta:
                    translated_accum += delta
                    sys.stdout.write(delta)
                    sys.stdout.flush()

            # Ensure newline after finished streaming
            print()
        except Exception as e:
            print("\n[WARN] Streaming failed, falling back to non-streaming:", e, file=sys.stderr)
            try:
                response = client.chat.completions.create(
                    model="aya-expanse-8b",
                    messages=[
                        {"role": "system", "content": current_system_prompt},
                        {"role": "user", "content": ctext}
                    ],
                    temperature=0,
                )
                try:
                    translated_accum = response.choices[0].message.content.strip()
                except Exception:
                    translated_accum = getattr(response.choices[0], 'text', '') or ''
            except Exception as e2:
                print("[ERROR] Fallback failed:", e2, file=sys.stderr)
                translated_accum = ctext
                stream_ok = False

        # Validate length and forbidden phrases; if rejected, use original chunk
        multiplier = high_multiplier_map.get(args.lang, 2.5)
        if len(translated_accum) > multiplier * len(ctext) or any(f in translated_accum for f in FORBIDDEN):
            print("[WARN] Translation rejected due to length/forbidden phrases; using original chunk.")
            translated_accum = ctext

        final_output.append(translated_accum.rstrip() + "\n\n")

    full_text = "".join(final_output)

    # Fix markdown links: [text](path)
    full_text = re.sub(r'(\[.*?\]\()(?!(?:http|/|#|\.\./))', r'\1../', full_text) 

    # Fix HTML attributes: src="path" or href="path"
    full_text = re.sub(r'((?:src|href)=["\'])(?!(?:http|/|#|\.\./))', r'\1../', full_text)

    os.makedirs("locales", exist_ok=True)
    with open(f"locales/README.{args.lang}.md", "w", encoding="utf-8") as f:
        f.write(full_text)


if __name__ == "__main__":
    main()
