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

def reply_message(request, id):
    if request.method == 'PUT':
        try:
            # 根据消息 ID 查询消息数据
            aMessage = Message.objects.get(pk=id)
            # 解析 PUT 请求的 JSON 数据
            data = json.loads(request.body)
            # 更新消息的回复信息
            aMessage.reply = data.get('reply')
            aMessage.save()
            # 返回成功信息
            return JsonResponse({'message': 'Message updated successfully'})
        except Message.DoesNotExist:
            # 如果找不到对应的消息，返回错误信息
            return JsonResponse({'error': 'Message not found'}, status=404)
        except json.JSONDecodeError:
            # 如果 JSON 解析失败，返回错误信息
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        # 如果不是 PUT 请求，返回错误信息
        return JsonResponse({'error': 'Only PUT requests are allowed'}, status=405)