# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class ChargingStations(models.Model):
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
        managed = False
        db_table = 'charging_stations'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class MessageMessage(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=100)
    content = models.TextField()
    timestamp = models.DateTimeField()
    contact = models.CharField(max_length=200, blank=True, null=True)
    title = models.CharField(max_length=200)
    reply = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'message_message'


class SpatialRefSys(models.Model):
    srid = models.IntegerField(primary_key=True)
    auth_name = models.CharField(max_length=256, blank=True, null=True)
    auth_srid = models.IntegerField(blank=True, null=True)
    srtext = models.CharField(max_length=2048, blank=True, null=True)
    proj4text = models.CharField(max_length=2048, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spatial_ref_sys'


class Stations(models.Model):
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


class Test(models.Model):

    class Meta:
        managed = False
        db_table = 'test'


class Xuzhou(models.Model):
    geom = models.TextField(blank=True, null=True)  # This field type is a guess.
    adcode = models.BigIntegerField(blank=True, null=True)
    name = models.CharField(max_length=254, blank=True, null=True)
    center = models.CharField(max_length=254, blank=True, null=True)
    centroid = models.CharField(max_length=254, blank=True, null=True)
    childrennu = models.BigIntegerField(blank=True, null=True)
    level = models.CharField(max_length=254, blank=True, null=True)
    subfeature = models.BigIntegerField(blank=True, null=True)
    acroutes = models.CharField(max_length=254, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'xuzhou'
