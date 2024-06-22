from django.db import models
# Create your models here.
class Message(models.Model):
    id = models.AutoField(primary_key=True)  # 自动生成的 id 字段
    username = models.CharField(max_length=100)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)  # 新增标题字段
    contact = models.CharField(max_length=200, blank=True, null=True)
    reply = models.TextField(blank=True, null=True)  # 新增回复字段
    #image = models.ImageField(upload_to='messages/', blank=True, null=True)  # 新增图片字段

    def __str__(self):
        return self.title