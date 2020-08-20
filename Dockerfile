FROM nikolaik/python-nodejs:latest

# Install dependencies.
ADD requirements.txt /requirements.txt
ADD main.py /main.py
ADD loc.py /loc.py
ADD make_bar_graph.py /make_bar_graph.py
ADD colors.json /colors.json
ADD translation.json /translation.json
RUN pip install -r requirements.txt

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN npm -g config set user root

RUN npm install -g vega-lite vega-cli canvas

ENTRYPOINT ["python", "/main.py"]

