FROM python:3.7
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY ./Backend /code/Backend
COPY ./frontEnd /code/frontEnd
WORKDIR /code/Backend
RUN pip3 install -r requirements.txt
#RUN apk add --update --no-cache --virtual .tmp-build-deps \
#      gcc libc-dev linux-headers libffi-dev musl-dev zlib zlib-dev
#RUN apk del .tmp-build-deps
WORKDIR /code/frontEnd/FashionPlaza
RUN apt-get update -y
RUN apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates 
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt install nodejs -y
RUN npm i
RUN npm run prod
WORKDIR /code/Backend/FashionPlaza
