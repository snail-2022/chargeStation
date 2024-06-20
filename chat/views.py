from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
import json
from openai import OpenAI

# 初始化OpenAI客户端
client = OpenAI(api_key="sk-12deed56376a4cd2a3311dbc2d88ebb6", base_url="https://api.deepseek.com")

# 预先设置的提示
default_prompt = """
- 角色：你是徐州市共享充电桩运营管理服务平台的智能机器人助手
- 任务：你的任务是帮助充电桩使用用户回答问题
- 功能: 如果你需要输出一个充电桩的位置、坐标等，请按照下面给出的格式输出json格式，不要加任何其他的字符
{
    "charge_stations": [
        {
            "name": "国家电网充电桩",
            "address": "大学路1号",
            "phone": "(0516)86282115",
            "latitude": 34.324681,
            "longitude": 118.050958,
            "id": 21
        }
    ]
}
"""

# 初始消息
initial_messages = [
    {"role": "system", "content": default_prompt},
]
def RobPage(request):
    return render(request, "chatrob.html")
def chat_with_model(user_input):
    messages = initial_messages.copy()  # 创建初始消息的副本
    messages.append({"role": "user", "content": user_input})
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=messages,
        stream=False
    )
    reply = response.choices[0].message.content
    messages.append({"role": "assistant", "content": reply})
    return reply
def process_chat_message(user_input):
    try:
        if not user_input:
            return {"error": "No user input provided"}, 'error'
        reply = chat_with_model(user_input)
        # 尝试解析Chatbot回复的JSON格式
        try:
            json_response = json.loads(reply)
            return json_response, 'json'
        except json.JSONDecodeError:
            return reply, 'text'  # 如果无法解析为JSON，仍然返回原始回复字符串
    except ValueError as ve:
        return str(ve), 'error'  # 返回具体的值错误信息
    except TypeError as te:
        return str(te), 'error'  # 返回特定的错误类型
    except Exception as e:
        return str(e), 'error'  # 捕获任何其他未知异常并返回通用错误信息
class ChatView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON body"}, status=400)
        user_input = data.get('user_input')
        response, data_type = process_chat_message(user_input)
        if data_type == 'json':
            # 如果返回的数据类型是 JSON，直接返回 JSON 数据
            return JsonResponse(response, status=200)
        else:
            # 否则返回原始的文本响应
            return JsonResponse({"reply": response}, status=200)
