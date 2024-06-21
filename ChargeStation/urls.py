"""charge URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from userManagement.views import register, register_page, login_page, login, index, managerIndex, logout
from message.views import messageForm, showMessages, leaveMessage,messageMain,leaveMessagePage,showMessagePage
from chat.views import RobPage,ChatView
from station import geoserver
from station import views

urlpatterns = [
    # *********************************************************************************#

    # *********************************************************************************#
    path('admin/', admin.site.urls),
    path("", login_page, name="login_page"),
    path("register_page/", register_page, name="register_page"),
    path("register_page/register", register, name="register"),
    path("login", login, name="login"),
    path('index', index, name='index'),
    path('managerIndex', managerIndex, name='managerIndex'),
    path('logout', logout, name='logout'),  # 退出
    # *********************************************************************************#
    path('get_point_data/', views.get_point_data, name='get_point_data'),
    path('create_buffer/', views.create_buffer, name='buffered_stations'),

    path('getwmts/', geoserver.wmts, name='getwmts'),
    path('tile_wmts/', geoserver.tile_wmts, name='tile_wmts'),
    # ***************************************************************************#
    path('messageMain/', messageMain, name='messageMain'),
    path('messageMain/leaveMessagePage/', leaveMessagePage, name='leaveMessagePage'),
    path('messageMain/showMessagePage/', showMessagePage, name='showMessagePage'),
    path('messageForm/', messageForm, name='messageForm'),
    path('leaveMessage/', leaveMessage, name='leaveMessage'),
    path('showMessages/', showMessages, name='showMessages'),
    # ***************************************************************************#
    path('RobPage/', RobPage, name='RobPage'),
    path('postMessage/', ChatView.as_view(), name='post_message'),
]
