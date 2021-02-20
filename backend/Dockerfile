FROM python:3.9

COPY requirements.txt requirements.txt
COPY ./src ./app
COPY .env .env

RUN pip install -r requirements.txt

WORKDIR ./app

ENV DEPLOY_MODE=docker

CMD ["python", "main.py"]