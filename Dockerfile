FROM python:3.9-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir -p /waka-readme-stats

ADD requirements.txt /waka-readme-stats/requirements.txt
RUN apk add --no-cache g++ jpeg-dev zlib-dev libjpeg make && pip3 install -r /waka-readme-stats/requirements.txt

ADD sources/* /waka-readme-stats/
ENTRYPOINT python3 /waka-readme-stats/main.py
