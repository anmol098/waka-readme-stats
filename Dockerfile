FROM nikolaik/python-nodejs:python3.9-nodejs16

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR ./waka-readme-stats

ADD requirements.txt ./requirements.txt
ADD Makefile ./Makefile
ADD sources/* ./

RUN make dependencies

ENTRYPOINT python3 ./main.py
