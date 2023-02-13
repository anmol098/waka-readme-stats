FROM python:3.9-alpine

ADD requirements.txt /requirements.txt
RUN apk add --no-cache g++ jpeg-dev zlib-dev libjpeg make && pip3 install -r requirements.txt

ADD main.py /main.py
ADD loc.py /loc.py
ADD make_bar_graph.py /make_bar_graph.py
ADD colors.json /colors.json
ADD translation.json /translation.json

ENTRYPOINT ["python", "/main.py"]
