FROM ubuntu:latest

ARG DEBIAN_FRONTEND=noninteractive

# Install dependencies.
ADD requirements.txt /requirements.txt
ADD main.py /main.py
ADD loc.py /loc.py
ADD make_bar_graph.py /make_bar_graph.py
ADD colors.json /colors.json

RUN apt-get update

RUN apt-get -y install wget

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install ./google-chrome-stable_current_amd64.deb

RUN apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip
RUN apt-get -y install chromium-chromedriver
RUN pip3 install -r requirements.txt
RUN pip3 install selenium
ENTRYPOINT ["python", "/main.py"]
