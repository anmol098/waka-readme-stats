FROM python:3.9-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /waka-readme-stats

ADD requirements.txt ./requirements.txt
RUN apk add --no-cache g++ jpeg-dev zlib-dev libjpeg make && pip3 install -r requirements.txt

ADD sources/* ./
ENTRYPOINT python3 /waka-readme-stats/main.py
