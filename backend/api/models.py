from django.db import models


class TextToVoice(models.Model):
    audio = models.FileField(upload_to="media/voice_to_text/")
    text = models.TextField()
