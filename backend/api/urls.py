from django.urls import path
from .views import *

urlpatterns = [
    path("video_txt/", VideoToText.as_view()),
    path("txt_audio/", TextToAudio.as_view()),
    path("voice_text/",VoiceToText.as_view()),
    path("img_text/", ImageToText.as_view()),
    path("summari_text/",SummarizeText.as_view())
]
