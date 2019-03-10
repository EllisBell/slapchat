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
    

def get_image(request):
    robin_text = request.GET['robinText']
    batman_text = request.GET['batmanText']
    # Save image as buffered and encode as base64 so can use in AJAX call from client
    buffered = BytesIO()
    img = mg.get_meme(robin_text, batman_text)
    img.save(buffered, format="JPEG")
    encoded_string = base64.b64encode(buffered.getvalue())
    return HttpResponse(encoded_string, content_type="image/jpeg")
