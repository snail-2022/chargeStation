#from django.db import models
from django.contrib.gis.db import models

class ChargingStations(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    address = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    location = models.TextField(blank=True, null=True)  # This field type is a guess.
    num_chargers = models.IntegerField()
    operator = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20)
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    charger_type = models.CharField(max_length=50, blank=True, null=True)
    power = models.IntegerField(blank=True, null=True)
    fee = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'charging_stations'
        app_label = 'charge'


class Stations(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    phone = models.TextField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    longitude = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    location = models.GeometryField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stations'
        app_label = 'charge'
