FROM python:3.10.4-slim-buster
WORKDIR /network
EXPOSE 8000
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
CMD ["python3","manage.py","runserver", "0.0.0.0:8000"]