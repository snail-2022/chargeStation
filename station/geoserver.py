from django.http import HttpResponse
from django.shortcuts import render
import requests
base_url = 'http://localhost:8080/'

# 获取地图瓦片服务
def wmts(request):
   ''' print(request)
    url = base_url+'geoserver/map/wms?service=WMS&request=GetMap&layers='+request.GET['layers']+\
        '&styles=&format='+request.GET['format']+'&transparent='+request.GET['transparent']+\
          '&version='+request.GET['version']+'&width='+request.GET['width']+'&height='+request.GET['height']+\
          '&srs='+request.GET['srs']+'&bbox='+request.GET['bbox']
    if 'CQL_FILTER' in request.GET:
        url = url + '&CQL_FILTER=' + request.GET['CQL_FILTER']
    print(url)
    image_data = requests.get(url=url,stream=True)
    return HttpResponse(image_data,content_type='image/png')'''

# 访问tile_wmts页面
def tile_wmts(request):
    return render(request,'tile_wmts.html')
