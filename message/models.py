from django.db import models


# Create your models here.

class Message(models.Model):
    username = models.CharField(max_length=100)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)  # 新增标题字段
    contact_info = models.CharField(max_length=200)  # 新增联系方式字段
    image = models.ImageField(upload_to='messages/', blank=True, null=True)  # 新增图片字段

    def __str__(self):
        return self.content
