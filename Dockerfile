FROM nikolaik/python-nodejs:latest

# Install dependencies.
ADD requirements.txt /requirements.txt
ADD main.py /main.py
ADD loc.py /loc.py
ADD make_bar_graph.py /make_bar_graph.py
ADD colors.json /colors.json
RUN pip install -r requirements.txt
RUN npm install vega-lite vega-cli canvas

ENTRYPOINT ["python", "/main.py"]
