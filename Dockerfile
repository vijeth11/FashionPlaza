FROM python:3.7
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY ./Backend /code/Backend
COPY ./frontEnd /code/frontEnd
WORKDIR /code/Backend
RUN pip3 install -r requirements.txt
WORKDIR /code/Backend/FashionPlaza
RUN python3 manage.py dumpdata --natural-foreign \
   --exclude=auth.permission --exclude=contenttypes \
   --indent=4 > data.json
RUN chmod 755 data.json
RUN rm -rf db.sqlite3
WORKDIR /code/frontEnd/FashionPlaza
RUN apt-get update -y
RUN apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates 
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt install nodejs -y
RUN npm i
RUN npm run prod
WORKDIR /code
# remove the frontEnd file to reduce docker image size once prod build
RUN rm -r frontEnd
ARG buildtime_variable=PROD
ENV server_type=$buildtime_variable
WORKDIR /code/Backend/FashionPlaza