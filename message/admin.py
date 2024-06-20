from django.contrib import admin
from .models import Message
# Register your models here.

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('username', 'content', 'timestamp')
    search_fields = ('username', 'content')
    ordering = ('-timestamp',)
