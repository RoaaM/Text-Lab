FROM python:3.8.3-alpine

WORKDIR /app
ADD ./backend/requirements.txt /app/backend/

RUN apk add --update \
    gcc \
    jpeg-dev \
    libffi-dev \
    musl-dev \
    openjpeg-dev \
    openssl-dev \
    postgresql-client \
    postgresql-dev \
    py-cffi \
    python3-dev \
    zlib-dev 




# freetype-dev \
# gdk-pixbuf-dev \
# gettext \
# lcms2-dev \
# pango-dev \
# poppler-utils \
# bash 
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

RUN pip3 install --upgrade pip
RUN pip install gunicorn


RUN pip3 install -r backend/requirements.txt

ADD ./backend /app/backend
ADD ./docker /app/docker

RUN chmod +x /app/docker/backend/wsgi-entrypoint.sh