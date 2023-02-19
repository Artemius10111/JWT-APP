from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
            Post,
        )
from .serializers import (
            PostSerializer,
        )
from rest_framework.permissions import IsAuthenticated
from .models import Post_like
from .nd_models import (
            Post_like_GET,
            Post_like_POST
        )
from .functions import (
            get_bool_post_liked_from_user,
            get_post_likes
        )
from uuid import UUID
    

@api_view(['GET',])
def post_list_view(request) -> object:
    if request.method == "GET":
        post = Post.objects.all()
        serializer = PostSerializer(post, many=True)
        return Response(serializer.data)
    return None

@api_view(['GET',])
def post_detail_view(request, pk: UUID) -> object:
    if request.method == "GET":
        try:
            post = Post.objects.get(id=pk)
            serializer = PostSerializer(post)
            return Response(serializer.data)
        except Post.DoesNotExist:
            pass
    return None

@api_view(['GET',])
def post_like_view(request, pk: UUID) -> object:
    if request.method == "GET":
        is_post_liked: bool = get_bool_post_liked_from_user(user=request.user, pk=pk)
        post_likes: list[str] = get_post_likes(pk=pk)
        print(post_likes)
        post_like_get = Post_like_GET(
                is_post_liked=is_post_liked,
                post_likes=post_likes
        )
        return Response(post_like_get.json())
        
@api_view(['POST',])
@permission_classes([IsAuthenticated])
def post_like_make(request, pk: UUID) -> object:
    if all([request.method == "POST", request.user.is_authenticated]):
        if request_cookie_and_jwt_equals(request):
            print("ok")
    return Response(request.json)
