FROM nikolaik/python-nodejs:python3.9-nodejs16

ADD requirements.txt /requirements.txt
ADD main.py /main.py
ADD loc.py /loc.py
ADD make_bar_graph.py /make_bar_graph.py
ADD colors.json /colors.json
ADD translation.json /translation.json

ENV PATH "$PATH:/home/root/.npm-global/bin"

RUN python -m pip install --upgrade pip wheel setuptools
RUN pip install -r requirements.txt
RUN npm -g config set user root
RUN npm i -g npm@latest
RUN npm i -g vega vega-lite vega-cli canvas

ENTRYPOINT ["python", "/main.py"]
