web: sh -c 'cd ./slapchat/ && exec daphne slapchat.asgi:application --port $PORT --bind 0.0.0.0 -v2'
worker: sh -c 'cd ./slapchat/ && python manage.py runworker -v2'
