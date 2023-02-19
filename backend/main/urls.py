from django.urls import path
from .views import (
        post_list_view,
        post_detail_view,
        post_like_view,
        post_like_make
        )

urlpatterns = [
    path("post_list/", post_list_view, name="post_list_view"),
    path("post_detail/<uuid:pk>", post_detail_view, name="post_detail_view"),
    path("post_like/<uuid:pk>", post_like_view, name="post_like_view"),
    path("post_like_make/<uuid:pk>", post_like_make, name="post_like_make"), 
]

