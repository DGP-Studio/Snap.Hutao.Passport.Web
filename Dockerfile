#!/bin/sh
# Build Stage
FROM python:3.12 AS builder
WORKDIR /code
ADD . /code
RUN pip install fastapi["all"]
RUN pip install sqlalchemy
RUN pip install pymysql
RUN pip install pycryptodome
RUN pip install "redis[hiredis]"
#RUN pip install --no-cache-dir -r /code/requirements.txt
RUN pip install pyinstaller
RUN pyinstaller -F main.py

# Runtime
FROM ubuntu:22.04 AS runtime
WORKDIR /app
COPY --from=builder /code/dist/main .
COPY /app/static /app/app/static
EXPOSE 80
ENTRYPOINT ["./main"]