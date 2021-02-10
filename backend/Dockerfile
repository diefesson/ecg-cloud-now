FROM python:3.9

COPY requirements.txt requirements.txt
COPY ./src ./app

RUN pip install -r requirements.txt

WORKDIR ./app

CMD ["python", "main.py"]