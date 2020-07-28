FROM ubuntu:latest

# Install dependencies.
ADD requirements.txt /requirements.txt
ADD main.py /main.py
ADD loc.py /loc.py
ADD make_bar_graph.py /make_bar_graph.py
ADD colors.json /colors.json

RUN apt-get update \
  && apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip
RUN y | apt-get install chromium-chromedriver
RUN pip3 install -r requirements.txt
RUN pip3 install selenium
ENTRYPOINT ["python", "/main.py"]
