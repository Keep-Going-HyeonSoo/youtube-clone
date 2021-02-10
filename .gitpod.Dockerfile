FROM gitpod/workspace-full

USER gitpod

# Install custom tools, runtime, etc.
RUN sudo apt-get update && \
    sudo apt-get install -y zsh

# Install MongoDB
# Source: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu-tarball/#install-mongodb-community-edition
RUN mkdir -p /tmp/mongodb && \
    cd /tmp/mongodb && \
    wget -qOmongodb.tgz https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2004-4.4.2.tgz && \
    tar xf mongodb.tgz && \
    cd mongodb-* && \
    sudo cp bin/* /usr/local/bin/ && \
    rm -rf /tmp/mongodb && \
    sudo mkdir -p /data/db && \
    sudo chown gitpod:gitpod -R /data/db

# Install Oh-My-Zsh
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh

# Install tree
RUN sudo apt-get install tree

# Install Hack font
RUN sudo apt-get install fonts-hack

# Reference : https://wayhome25.github.io/etc/2017/03/12/zsh-alias/

# Install fonts-powerline ( for zsh )
RUN sudo apt-get install fonts-powerline

# Config zsh theme
RUN echo 'prompt_context() { }' >> ~/.zshrc
RUN sed -i 's|robbyrussell|agnoster|g' ~/.zshrc


