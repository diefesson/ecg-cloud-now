FROM python:3.9

COPY requirements.txt requirements.txt
COPY ./src /home/app
COPY .env /home/.env

RUN pip install -r requirements.txt

WORKDIR /home/app

ENV DEPLOY_MODE=docker

CMD ["python", "main.py"]