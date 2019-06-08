FROM python:3.7

EXPOSE 5000

WORKDIR /backend

COPY requirements.txt /backend
RUN pip install -r requirements.txt

COPY run.py /backend
COPY washroomcatalog /backend/washroomcatalog
CMD python run.py
