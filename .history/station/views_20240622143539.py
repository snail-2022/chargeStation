from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.http import JsonResponse
from .models import ChargingStations, Stations



def get_point_data(request):
    # 从数据库中获取所有充电站数据
    stations = Stations.objects.all()
    # 构造包含所有充电站经纬度信息的列表
    data = []
    for station in stations:
        latitude = station.latitude
        longitude = station.longitude
        # 将地理空间数据转换为WKT格式
        wkt_location = station.location.wkt
        data.append({'latitude': latitude, 'longitude': longitude,'location':wkt_location})

    # 返回 JSON 响应
    return JsonResponse(data, safe=False)


def create_charging_station(request):
    if request.method == 'POST':
        # 从请求中获取所有表单数据
        name = request.POST.get('name')
        address = request.POST.get('address')
        latitude = request.POST.get('latitude')
        longitude = request.POST.get('longitude')
        num_chargers = request.POST.get('num_chargers')
        operator = request.POST.get('operator')
        status = request.POST.get('status')
        contact_phone = request.POST.get('contact_phone')
        charger_type = request.POST.get('charger_type')
        power = request.POST.get('power')
        fee = request.POST.get('fee')
        # 验证所有字段是否存在
        if not all([name, address, latitude, longitude, num_chargers, status]):
            return JsonResponse({'error': 'All required fields are not provided'})
        # 创建新的充电站对象
        charging_station = ChargingStations.objects.create(
            name=name, address=address, latitude=latitude, longitude=longitude,
            num_chargers=num_chargers, operator=operator, status=status,
            contact_phone=contact_phone, charger_type=charger_type,
            power=power, fee=fee
        )
        # 返回成功信息
        return JsonResponse({'message': 'Charging station created successfully'})
    else:
        # 如果不是 POST 请求，返回错误信息
        return JsonResponse({'error': 'Only POST requests are allowed'})


# 查找充电站数据
def search_charging_stations(request):
    if request.method == 'GET':
        # 从请求中获取查询条件（例如，充电站名称）
        query = request.GET.get('query')
        # 使用查询条件从数据库中查找符合条件的充电站数据
        charging_stations = ChargingStations.objects.filter(name__icontains=query)
        # 构造包含查询结果的列表
        data = [{'id': station.id, 'name': station.name, 'latitude': station.latitude, 'longitude': station.longitude}
                for station in charging_stations]
        # 返回 JSON 响应
        return JsonResponse(data, safe=False)
    else:
        # 如果不是 GET 请求，返回错误信息
        return JsonResponse({'error': 'Only GET requests are allowed'})


def update_charging_station(request, station_id):
    if request.method == 'PUT':
        try:
            # 根据充电站 ID 查询充电站数据
            charging_station = ChargingStations.objects.get(pk=station_id)
            # 更新充电站信息
            charging_station.name = request.PUT.get('name')
            charging_station.address = request.PUT.get('address')
            charging_station.latitude = request.PUT.get('latitude')
            charging_station.longitude = request.PUT.get('longitude')
            charging_station.num_chargers = request.PUT.get('num_chargers')
            charging_station.operator = request.PUT.get('operator')
            charging_station.status = request.PUT.get('status')
            charging_station.contact_phone = request.PUT.get('contact_phone')
            charging_station.charger_type = request.PUT.get('charger_type')
            charging_station.power = request.PUT.get('power')
            charging_station.fee = request.PUT.get('fee')
            charging_station.save()
            # 返回成功信息
            return JsonResponse({'message': 'Charging station updated successfully'})
        except ChargingStations.DoesNotExist:
            # 如果找不到对应的充电站，返回错误信息
            return JsonResponse({'error': 'Charging station not found'}, status=404)
    else:
        # 如果不是 PUT 请求，返回错误信息
        return JsonResponse({'error': 'Only PUT requests are allowed'})


def delete_charging_station(request, station_id):
    if request.method == 'DELETE':
        try:
            # 根据充电站 ID 查询充电站数据
            charging_station = ChargingStations.objects.get(pk=station_id)
            # 删除充电站对象
            charging_station.delete()
            # 返回成功信息
            return JsonResponse({'message': 'Charging station deleted successfully'})
        except ChargingStations.DoesNotExist:
            # 如果找不到对应的充电站，返回错误信息
            return JsonResponse({'error': 'Charging station not found'}, status=404)
    else:
        # 如果不是 DELETE 请求，返回错误信息
        return JsonResponse({'error': 'Only DELETE requests are allowed'})

def get_data():
    # 从数据库中查询所有Station对象
    stations = Station.objects.all()

    # 将查询结果转换为Pandas DataFrame
    df = pd.DataFrame(list(stations.values()))

    return df





