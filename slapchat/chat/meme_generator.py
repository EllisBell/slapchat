from django.contrib.staticfiles.templatetags.staticfiles import static
import base64
from PIL import Image, ImageFont, ImageDraw

text_colour = (0, 0, 0)

def get_meme(robin_text, batman_text):
    # text = add_ellipsis(text)
    # text = add_new_lines(text)
    # # this gives us width and height of text:
    # # w, h = draw.textsize(text, font)
    # TODO location of this has to be confirmed when deploying
    img = Image.open('chat/' + static('img/batman.png'))
    # # image width
    # # img.width
    draw = ImageDraw.Draw(img)
    # TODO location of this has to be confirmed when deploying
    font = ImageFont.truetype('chat/static/fonts/Courier New Italic.ttf', 15)
    # Add Robin text to image
    robin_info = get_robin_text_and_coords(robin_text)
    draw.text(robin_info["coords"], robin_info["text"], text_colour, font=font)
    # Add Batman text to image
    batman_info = get_batman_text_and_coords(batman_text)
    draw.text(batman_info["coords"], batman_info["text"], text_colour, font=font)

    return img

def get_robin_text_and_coords(text):
    text = text.lower()
    text = add_ellipsis(text)
    text = add_new_lines(text, 20)
    return {'text': text, 'coords': (12, 2)}

def get_batman_text_and_coords(text):
    text = text.upper()
    text = add_new_lines(text, 17)
    return {'text': text, 'coords': (225, 2)}

def add_new_lines(text, line_chars):
    # TODO make sure does not break up words
    new_text = ""
    for i in range(0, len(text), line_chars):
        new_text += text[i:i+line_chars] + "\n"
    return new_text

def add_ellipsis(text):
    return text[0:len(text)-1] + "-"
