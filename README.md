## Technology stack

- Backend: Django
- Frontend: React + TS
- Database: PostgreSQL

## Project deployment


#### Need to create an .env file in the root path '/' along with docker-compose.yml:
```plaintext

Example .env file

# these variables are needed for the smtp server
DJANGO_EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
DJANGO_EMAIL_HOST='smtp.gmail.com'
DJANGO_EMAIL_PORT=000
DJANGO_EMAIL_HOST_USER='example@gmail.com'
DJANGO_EMAIL_HOST_PASSWORD='******'
DJANGO_EMAIL_USE_TLS=True


# these variables are needed for connect to db
POSTGRES_DB='OnlineBanking'
POSTGRES_USER='admin'
POSTGRES_PASSWORD='admin'
POSTGRES_HOST='localhost'
POSTGRES_PORT='5432'
```

#### Build and run Docker containers:

```sh
docker-compose up --build -d
```
#### After the first run, make migrations to the database:

```sh
docker-compose exec backend python manage.py migrate --noinput
```

#### Now you can go to

frontend
```sh
http://localhost
```

backend
```sh
http://localhost:8000
```

admin panel
```sh
http://localhost:8000/admin/
```
#### After migration, superuser is automatically created for the admin panel

```sh
username="Bank"
password="bank"
```
