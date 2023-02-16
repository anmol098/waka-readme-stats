FROM nikolaik/python-nodejs:python3.9-nodejs16

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

ADD requirements.txt /waka-readme-stats/requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN npm i npm@next-8 && npm i vega vega-lite vega-cli canvas

ADD sources/* /waka-readme-stats/

ENTRYPOINT python3 /waka-readme-stats/main.py
