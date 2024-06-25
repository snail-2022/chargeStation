from django.http import HttpResponse
from django.shortcuts import render
from django.contrib import auth
from django.shortcuts import redirect




# Create your views here.
def indexPage(request):
    return render(request, 'zhuye2.html')

def fun1Page(request):
    return render(request, 'gengneng1.html')

def index(request):
    return HttpResponse("欢迎使用")

def register_page(request):
    return render(request, 'register.html')

def register(request):
    from django.contrib.auth.models import User
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        # username, email=None, password=None, **extra_fields
        user = User.objects.create_user(username=username, password=password)
        user.save()
        if user:
            auth.login(request, user)
            return redirect('login_page')  # 注册成功后跳转至登录
    return render(request, 'register.html')

def login_page(request):
    return render(request, 'login.html')


def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            if user.is_staff:
                return redirect('managerIndex')
            else:
                return redirect('index')
        else:
            return render(request, 'login.html', {'error': '用户名或密码错误'})
    return render(request, 'login.html')

def managerIndex(request):
    name = request.user.username
    return render(request, 'managerIndex.html', {'name':name})

def index(request):
    name = request.user.username
    return render(request, 'index.html', {'name':name})

def logout(request):
    auth.logout(request)
    return redirect('login_page') #退出后，页面跳转至登录界面