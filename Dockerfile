FROM node:18.12.1-buster

RUN apt-get update

RUN apt-get install -y \
    python3 python3-pip

RUN pip install markitdow==0.0.1a3

# COPY package.json /
# RUN npm install

CMD ["bash"]