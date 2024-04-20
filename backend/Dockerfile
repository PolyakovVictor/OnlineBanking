FROM python:latest

ENV PYTHONUNBUFFERED 1
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

WORKDIR /app

COPY . /app/

RUN pip install poetry

RUN python -m venv /venv

ENV PATH="/venv/bin:$PATH"

RUN poetry install

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
