from .models import Post, Post_like
from django.db.models import QuerySet
from typing import List 
from django.conf import settings
from uuid import UUID
import json


def get_post(pk: UUID) -> QuerySet[Post]:
    try:
        return Post.objects.get(id=pk)
    except Post.DoesNotEXist:
        return False

def get_bool_post_liked_from_user(user: QuerySet[settings.AUTH_USER_MODEL], pk: UUID) -> bool:
    try:
        post = get_post(pk=pk)
        return bool(Post_like.objects.get(post=post, user=user.id))
    except Post_like.DoesNotExist:
        return False

def get_post_likes(pk: UUID) -> list[str]:
    post: QuerySet[Post] = get_post(pk=pk)
    return [post_like.user.username for post_like in Post_like.objects.filter(post=post)]

def request_cookie_and_jwt_equals(request) -> bool:
    print(request)
    return True
