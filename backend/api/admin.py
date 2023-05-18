from django.contrib import admin
from .models import *


@admin.register(TextToVoice)
class AdminTextVoice(admin.ModelAdmin):
    pass