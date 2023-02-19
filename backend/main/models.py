from django.db import models
import uuid 
from django.conf import settings


class Post(models.Model):
    title = models.CharField(max_length=100, help_text="Title of post")
    body = models.TextField(max_length=500, help_text="Body of post")
#    images = models.ForeignKey("Post_image", on_delete=models.CASCADE, help_text="Images of post")
    id = models.UUIDField(default=uuid.uuid4, auto_created=True, primary_key=True, editable=False)

class Post_like(models.Model):
    post = models.ForeignKey("Post", on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

#class Post_image(models.Model):
#    image = models.ImageField()
#    id = models.Uuidfield(uuid=uuid.uuid4, auto_created=True, primary_key=True, editable=False)
