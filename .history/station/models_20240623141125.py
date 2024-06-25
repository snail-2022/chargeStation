from django.db import models

class ChargingStations(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(blank=True, null=True)



    class Meta:
        managed = False
        db_table = 'stations'
        app_label = 'charge'