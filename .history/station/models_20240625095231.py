from django.db import models
class ChargingStations(models.Model):
    name = models.TextField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    phone = models.TextField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    longitude = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    location = models.TextField(blank=True, null=True)  # This field type is a guess.
    total_charging_points = models.IntegerField()
    active_charging_points = models.IntegerField()
    electricity_price = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    power = models.IntegerField(blank=True, null=True)
    build_time = models.DateTimeField(blank=True, null=True)
    maintenance_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stations'

