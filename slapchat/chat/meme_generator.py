from django.contrib.staticfiles.templatetags.staticfiles import static
import base64
from PIL import Image, ImageFont, ImageDraw

def get_meme(robin_text, batman_text):
    # text = add_ellipsis(text)
    # text = add_new_lines(text)
    # # this gives us width and height of text:
    # # w, h = draw.textsize(text, font)
    img = Image.open('chat/' + static('img/batman.png'))
    # # image width
    # # img.width
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype('/Library/Fonts/Arial.ttf', 15)
    # todo change to get text and coordinates then draw here
    add_robin_text(robin_text, draw, font)
    add_batman_text(batman_text, draw, font)
    # draw.text((12, 2), text, (255, 255, 255), font=font)
    return img
    #return add_batman_text(text)

def add_robin_text(text, draw, font):
    text = text.lower()
    text = add_ellipsis(text)
    text = add_new_lines(text)
    draw.text((12, 2), text, (255, 255, 255), font=font)

def add_batman_text(text, draw, font):
    text = text.upper()
    text = add_new_lines(text)
    draw.text((225, 2), text, (255, 255, 255), font=font)

def add_new_lines(text):
    # todo make sure does not break up words
    # todo make num of chars a variable which is different for batman
    line_chars = 14
    new_text = ""
    for i in range(0, len(text), line_chars):
        new_text += text[i:i+line_chars] + "\n"
    print("text is")
    print(new_text)
    return new_text

def add_ellipsis(text):
    return text[0:len(text)-1] + "..."
