from openai import OpenAI

client = OpenAI(api_key="sk-12deed56376a4cd2a3311dbc2d88ebb6", base_url="https://api.deepseek.com")
messages = [
    {"role": "system", "content": "You are a helpful assistant"},
]
def chat(user_input):
    messages.append({"role": "user", "content": user_input})
    # 发送请求并获取响应
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=messages,
        stream=False
    )
    reply = response.choices[0].message.content
    messages.append({"role": "assistant", "content": reply})
    return reply
def chatbot_loop():
    while True:
        user_input = input("User: ")
        if user_input.lower() in ["exit", "quit", "bye"]:
            print("Chatbot: Goodbye!")
            break
        reply = chat(user_input)
        print("Chatbot:", reply)

chatbot_loop()