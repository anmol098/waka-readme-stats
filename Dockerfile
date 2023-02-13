FROM python:3.9-slim

ADD requirements.txt /requirements.txt
RUN pip3 install --upgrade pip wheel setuptools
RUN apk add --no-cache --virtual .build-deps g++ jpeg-dev zlib-dev libjpeg make && pip3 install -r requirements.txt && apk del .build-deps

ADD main.py /main.py
ADD loc.py /loc.py
ADD make_bar_graph.py /make_bar_graph.py
ADD colors.json /colors.json
ADD translation.json /translation.json

ENTRYPOINT ["python", "/main.py"]
