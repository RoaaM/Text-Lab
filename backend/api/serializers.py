from rest_framework import serializers
from .models import TextToVoice

class TextToVoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextToVoice
        fields = "__all__"