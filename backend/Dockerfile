FROM python:3.7

EXPOSE 5000

WORKDIR /backend

COPY requirements.txt /backend
RUN pip install -r requirements.txt

COPY app.py /backend
CMD python app.py
