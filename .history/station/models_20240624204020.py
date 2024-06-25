from django.db import models

class ChargingStations(models.Model):
    name = models.TextField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    phone = models.TextField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    longitude = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    location = models.TextField(blank=True, null=True)  # This field type is a guess.
    build_time = models.DateTimeField(blank=True, null=True)  # 建站时间
    maintenance_time = models.DateTimeField(blank=True, null=True)  # 维修时间

    class Meta:
        managed = False
        db_table = 'stations'