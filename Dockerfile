FROM python:3.13-alpine

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

RUN mkdir -p /waka-readme-stats/assets

WORKDIR /waka-readme-stats

COPY requirements.txt ./requirements.txt
RUN apk add --no-cache g++ jpeg-dev zlib-dev libjpeg make git && pip3 install -r ./requirements.txt

RUN git config --global user.name "readme-bot"
RUN git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"

COPY sources/. ./
COPY locales/. ./locales/

ENTRYPOINT ["python3", "main.py"]



