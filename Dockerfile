FROM python:3.7
ENV PYTHONUNBUFFERED=1
ARG buildtime_variable=PROD
ENV server_type=$buildtime_variable
WORKDIR /code
COPY ./Backend /code/Backend
COPY ./frontEnd /code/frontEnd
WORKDIR /code/Backend
RUN pip3 install -r requirements.txt
WORKDIR /code/frontEnd/FashionPlaza
RUN apt-get update -y
RUN apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates 
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt install nodejs -y
RUN npm i
RUN npm run prod
WORKDIR /code/Backend/FashionPlaza
