FROM node:23-bookworm

RUN apt-get update

RUN apt-get install -y \
    python3 python3-pip

RUN apt-get install -y pipx

RUN pipx install markitdown

RUN ln -s /root/.local/pipx/venvs/markitdown/bin/markitdown /usr/bin/

# COPY package.json /
# RUN npm install

CMD ["bash"]