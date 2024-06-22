import json

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
def showMessagePage(request):

    return render(request, "showMessagePage.html")
def messageForm(request):
    return render(request, "message.html")
def leaveMessage(request):
    if request.method == "POST":
        content = request.POST.get('content')
        title = request.POST.get('title')
        contact = request.POST.get('contact')
        #image = request.FILES.get('image')  # 处理上传的图片
        if content and title:
            message = Message(
                username=request.user.username,
                content=content,
                title=title,
                contact=contact,
                #image=image,
                timestamp=timezone.now()
            )
            message.save()
            return JsonResponse({"status": "success", "message": "留言已保存"})
        else:
            return JsonResponse({"status": "error", "message": "内容和标题是必填项"})
    return JsonResponse({"status": "error", "message": "请求方法不正确"})

def showMessages(request):
    messages = Message.objects.order_by('-timestamp')[:10]  # 显示最近的10条留言
    messages_data = [
        {
            "username": msg.username,
            "content": msg.content,
            "title": msg.title,
            "contact": msg.contact,
            #"image": msg.image.url if msg.image else None,  # 检查图片是否存在
            "timestamp": msg.timestamp
        }
        for msg in messages
    ]
    return JsonResponse({"messages": messages_data})

def reply_message(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message_id = data.get('messageId')
        reply_text = data.get('replyText')
        try:
            message = Message.objects.get(messageId=message_id)
            message.reply = reply_text
            message.save()
            return JsonResponse({'status': 'success', 'message': 'Reply text updated successfully'})
        except Message.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Message not found'}, status=404)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)