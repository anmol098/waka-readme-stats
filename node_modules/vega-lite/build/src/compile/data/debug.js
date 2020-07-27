import { entries, uniqueId } from '../../util';
import { OutputNode } from './dataflow';
import { SourceNode } from './source';
import pako from 'pako';
import { checkLinks } from './optimize';
/**
 * Print debug information for dataflow tree.
 */
export function printDebugDataflow(node) {
    console.log(`${node.constructor.name}${node.debugName ? `(${node.debugName})` : ''} -> ${node.children.map(c => {
        return `${c.constructor.name}${c.debugName ? ` (${c.debugName})` : ''}`;
    })}`);
    console.log(node);
    node.children.forEach(printDebugDataflow);
}
/**
 * Show the dataflow graph as an image (rendered by https://kroki.io/) on the command line.
 */
export function drawDataflow(roots, size = 500) {
    const dot = dotString(roots);
    const text = new TextEncoder().encode(dot);
    const compressed = pako.deflate(text, { level: 9, to: 'string' });
    const result = btoa(compressed).replace(/\+/g, '-').replace(/\//g, '_');
    const imageURL = `https://kroki.io/plantuml/png/${result}`;
    console.log('%c ', `font-size:${size}px; background:url(${imageURL}) no-repeat; background-size:contain`);
}
/**
 * Print the dataflow tree as graphviz.
 *
 * Render the output in e.g. http://viz-js.com/.
 */
export function dotString(roots) {
    // check the graph before printing it since the logic below assumes a consistent graph
    checkLinks(roots);
    const nodes = {};
    const edges = [];
    function getId(node) {
        let id = node['__uniqueid'];
        if (id === undefined) {
            id = uniqueId();
            node['__uniqueid'] = id;
        }
        return id;
    }
    function getLabel(node) {
        var _a;
        const out = [node.constructor.name.slice(0, -4)];
        if (node.debugName) {
            out.push(`<i>${node.debugName}</i>`);
        }
        else if (node instanceof SourceNode) {
            if (node.data.name || node.data.url) {
                out.push(`<i>${(_a = node.data.name) !== null && _a !== void 0 ? _a : node.data.url}</i>`);
            }
        }
        const dep = node.dependentFields();
        if (dep === null || dep === void 0 ? void 0 : dep.size) {
            out.push(`<font color="grey" point-size="10">IN:</font> ${[...node.dependentFields()].join(', ')}`);
        }
        const prod = node.producedFields();
        if (prod === null || prod === void 0 ? void 0 : prod.size) {
            out.push(`<font color="grey" point-size="10">OUT:</font> ${[...node.producedFields()].join(', ')}`);
        }
        if (node instanceof OutputNode) {
            out.push(`<font color="grey" point-size="10">required:</font> ${node.isRequired()}`);
        }
        return out.join('<br/>');
    }
    function collector(node) {
        var _a, _b;
        const id = getId(node);
        nodes[id] = {
            id: id,
            label: getLabel(node),
            hash: node instanceof SourceNode
                ? (_b = (_a = node.data.url) !== null && _a !== void 0 ? _a : node.data.name) !== null && _b !== void 0 ? _b : node.debugName : String(node.hash()).replace(/"/g, '')
        };
        for (const child of node.children) {
            edges.push([id, getId(child)]);
            collector(child);
        }
    }
    for (const n of roots) {
        collector(n);
    }
    const dot = `digraph DataFlow {
  rankdir = TB;
  node [shape=record]
  ${entries(nodes)
        .map(({ key, value }) => `  "${key}" [
    label = <${value.label}>;
    tooltip = "[${value.id}]&#010;${value.hash}"
  ]`)
        .join('\n')}

  ${edges.map(([source, target]) => `"${source}" -> "${target}"`).join(' ')}
}`;
    return dot;
}
//# sourceMappingURL=debug.js.map