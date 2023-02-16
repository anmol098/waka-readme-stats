FROM nikolaik/python-nodejs:python3.9-nodejs16

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /waka-readme-stats

ADD requirements.txt ./requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN npm i npm@next-8 && npm i vega vega-lite vega-cli canvas

ADD sources/* ./

ENTRYPOINT python3 ./main.py
