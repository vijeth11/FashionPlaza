# FashionPlaza

This project is of a website for selling different brands of cloth from all across the world. It uses Angular8, Ngrx store managment for fontend and django as backend technology. I am using sqlite and postgress sql as database. This application uses docker images technology to launch and Travis for CI\CD pipeline.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).



# Docker Commands

docker build --no-cache -t e-commerceclothwebsite_web . -> build a image using the name given for docker file in current directory

docker run --rm -p 8000:8000 --name FashionPlaza -it e-commerceclothwebsite_web python3 manage.py runserver 0.0.0.0:8000  -> to run docker instance from image created by previous command

docker run --rm -p 8000:8000 --name FashionPlaza -it e-commerceclothwebsite_web gunicorn --bind :8000 --workers 3 FashionPlaza.wsgi -> to run docker instance in gunicorn

docker compose up -> other way to build container and run but it depends on the source of the project in local and it can run multiple containers at a time

docker run --rm --name FashionPlaza -it e-commerceclothwebsite_web /bin/bash -> get interactive bash terminal for the image

# Docker Reference Website

https://pythonspeed.com/articles/docker-connection-refused/ -> regarding network connection

https://docs.docker.com/engine/reference/commandline/run/

https://docs.docker.com/compose/reference/build/
