build:
	docker-compose build

up:
	docker-compose up -d

test:
	docker-compose run \
  -e DJANGO_SETTINGS_MODULE=settings \
  --no-deps --rm web py.test apps -s

makemigrations:
	docker-compose run \
  --no-deps --rm web python3 manage.py makemigrations

migrate:
	docker-compose run \
  --no-deps --rm web python3 manage.py migrate

up-non-daemon:
	docker-compose up

start:
	docker-compose start

stop:
	docker-compose stop

restart:
	docker-compose stop && docker-compose start

shell-nginx:
	docker exec -ti nz01 /bin/sh

shell-web:
	docker exec -ti dz01 /bin/sh

shell-db:
	docker exec -ti pz01 /bin/sh

log-nginx:
	docker-compose logs nginx  

log-web:
	docker-compose logs web  

log-db:
	docker-compose logs db

collectstatic:
	docker exec dz01 /bin/sh -c "python manage.py collectstatic --noinput"  