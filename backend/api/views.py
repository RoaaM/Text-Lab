from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.storage import FileSystemStorage
import os
from django.core.files.storage import default_storage
from rest_framework import status
from moviepy.config import change_settings
from gtts import gTTS
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser
from utils.Utils import generate_summary
from .models import TextToVoice
from .serializers import *
from django.utils.crypto import get_random_string
from django.conf import settings
from django.core.files.storage import FileSystemStorage
# change_settings({"FFMPEG_BINARY": "/opt/homebrew/bin/ffmpeg"})
# os.environ["IMAGEIO_FFMPEG_EXE"] = "/opt/homebrew/bin/ffmpeg"



import moviepy.editor as mp
import speech_recognition as sr
from google.cloud import speech_v1p1beta1 as speech
from google.cloud import vision
from google.cloud.vision_v1 import types

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"C:\Users\roaas\OneDrive\Desktop\lowproject-385216-f98896a4a2e9.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"C:\Users\roaas\OneDrive\Desktop\modelsapp-386522-b1b5afac7c82.json"




class SummarizeText(APIView):
    def post(self,request,format=None):
        file = request.FILES.get("file")
        text = file.read().decode('utf-8')
        summary = generate_summary(text)

        return Response({"output": summary}, status=status.HTTP_200_OK)


class ImageToText(APIView):
    text = None
    sum_text = None
    def post(self, request,format=None):
        image = request.FILES.get("image")
        if image:
            client = vision.ImageAnnotatorClient()
            content = image.read()
            image_binary = types.Image(content=content)
            response = client.document_text_detection(image=image_binary)
            image.text = response.full_text_annotation.text
            text = image.text
            if text:
                return Response({"output": text}, status=status.HTTP_200_OK)
        return Response({"Error While Proccess Your Image"}, status=status.HTTP_400_BAD_REQUEST)


class VoiceToText(APIView):
 
    def post(self,request,format=None):
        text = ""
        audio_file = request.FILES.get('audio_file')
        if audio_file:
            content = audio_file.read()
            # Sets the audio file's encoding and sample rate
            client = speech.SpeechClient()
            audio = speech.RecognitionAudio(content=content)
            config = speech.RecognitionConfig(
                encoding=speech.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
                sample_rate_hertz=16000,  # Replace with your audio file's sample rate
                language_code='en-US'     # Replace with your audio file's language
            )
            response = client.recognize(config=config, audio=audio)
            # Extract the transcribed text
            for result in response.results:
                text += result.alternatives[0].transcript + ' '
        return Response({"output": text }, status=status.HTTP_200_OK)
            


class TextToAudio(APIView):
    parser_classes = ( MultiPartParser,)
    def post(self,request,format=None):
        text = request.POST.get("text")
        if text:
            # Create the "audio" directory if it doesn't exist
            # output_dir = "../media/audio/"
            # os.makedirs(output_dir, exist_ok=True)
            # Convert the text to speech and save it to an audio file
            tts = gTTS(text)
            unique_id = get_random_string(length=32)
            output_file = os.path.join(settings.MEDIA_ROOT, "{}.mp3".format(unique_id))
            tts.save(output_file)
            text_to_voice = TextToVoice.objects.create(text=text, audio="{}.mp3".format(unique_id))
            # response = HttpResponse(output_file, content_type='application/octet-stream')
            # response['Content-Disposition'] = 'attachment; filename=%s' % output_file
            serializer = TextToVoiceSerializer(text_to_voice, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response("Error", status=status.HTTP_400_BAD_REQUEST)


class VideoToText(APIView):
    def post(self,request,format=None):
        video_file = request.FILES.get("video")
        if video_file:
            fs = FileSystemStorage()
            file_name = default_storage.save(video_file.name, video_file)
            # Load the video file using moviepy
            video = mp.VideoFileClip("./media/" + file_name)
            # Extract the audio from the video
            audio = video.audio
            # Set a path to save the extracted audio as a WAV file
            audio_path = "./media/{}_output.{}".format(file_name, "wav") 
            # save audio file
            audio.write_audiofile(audio_path)
            # Create a recognizer instance
            recognizer = sr.Recognizer()
            # Open the audio file using SpeechRecognition
            
            with sr.AudioFile(audio_path) as source:
                # Read the audio data from the file
                audio_data = recognizer.record(source)
                # Perform speech recognition

            text = recognizer.recognize_google(audio_data)

            return Response({"output": text}, status=status.HTTP_200_OK)
        
        return Response({"Error while Proccess your video"}, status=status.HTTP_400_BAD_REQUEST)



