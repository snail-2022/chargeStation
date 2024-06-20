from .models import Message
from django.utils import timezone
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required



# Create your views here.

def messageMain(request):
    return render(request, "messageMain.html")

def leaveMessagePage(request):
    return render(request, "leaveMessagePage.html")



def messageForm(request):
    return render(request, "message.html")


def leaveMessage(request):
    if request.method == "POST":
        content = request.POST.get('content')
        if content:
            Message.objects.create(username=request.user.username, content=content, timestamp=timezone.now())
            return JsonResponse({"status": "success", "message": "留言已保存"})
    return JsonResponse({"status": "error", "message": "未能保存留言"})

def showMessages(request):
    messages = Message.objects.order_by('-timestamp')[:10]  # 显示最近的10条留言
    messages_data = [
        {"username": msg.username, "content": msg.content, "timestamp": msg.timestamp}
        for msg in messages
    ]
    return JsonResponse({"messages": messages_data})