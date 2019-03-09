from django.contrib.staticfiles.templatetags.staticfiles import static
import base64
from PIL import Image, ImageFont, ImageDraw

def get_meme(text):
    img = Image.open('chat/' + static('img/batman.png'))
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype('/Library/Fonts/Arial.ttf', 25)
    draw.text((10, 10), text, (255, 255, 255), font=font)
    return img
