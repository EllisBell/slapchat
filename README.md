# slapchat
Messing around with websockets. Available (hopefully) [here](https://slapchatapp.herokuapp.com/chat/)

A single-room chat website in which messages are displayed through the medium of the "Batman Slapping Robin" meme. Todo: make mobile-friendly.

N.b. I don't think it is in any way scalable but fun to use with my gf.

### Get it running locally

You'll need Python 3. Run
> pip install -r requirements.txt

to install the required packages.

This uses [Django Channels](https://channels.readthedocs.io/en/latest/) for handling WebSockets communication and enabling the 
real time chat. It is using redis as it's backing store so you will need an instance of redis. I suggest using Docker
to get redis up and running locally.

> docker run -p 6379:6379 -d redis

You might need to set up some environment variables or amend the following settings to work in dev:
> * SLAP_SECRET - the Django secret key
> * DEBUG - set to True to enable dev debugging
> * REDIS_URL

### Built with
* [Django](https://www.djangoproject.com/)
* [Django Channels](https://channels.readthedocs.io/en/latest/)
