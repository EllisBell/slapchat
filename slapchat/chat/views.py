from django.shortcuts import render
from django.http import HttpResponse
from django.utils.safestring import mark_safe
import json
from django.contrib.staticfiles.templatetags.staticfiles import static
import base64
from . import meme_generator as mg
from io import BytesIO


# Create your views here.

def index(request):
    return render(request, 'chat/index.html', {})
    


# def room(request):
#     return render(request, 'chat/room.html', {})


def get_image(request):
    #image_data = open('chat/' + static('img/tux.png'), 'rb').read()
    # Open image file, read in and encode as base64 so can use in AJAX call from client
    # with open('chat/' + static('img/batman.png'), "rb") as image_file:
    #     encoded_string = base64.b64encode(image_file.read())
    print(request.GET)
    robin_text = request.GET['robinText']
    batman_text = request.GET['batmanText']
    buffered = BytesIO()
    img = mg.get_meme(robin_text, batman_text)
    img.save(buffered, format="JPEG")
    encoded_string = base64.b64encode(buffered.getvalue())
    return HttpResponse(encoded_string, content_type="image/jpeg")
