from django.db import models
class ChargingStations(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    phone = models.TextField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=19, decimal_places=16, blank=True, null=True)
    longitude = models.DecimalField(max_digits=19, decimal_places=16, blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    build_time = models.DateTimeField(blank=True, null=True)  # 建站时间
    maintenance_time = models.DateTimeField(blank=True, null=True)  # 维修时间
    name1=models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'stations'
        app_label = 'charge'

