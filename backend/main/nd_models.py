from pydantic import BaseModel

class Post(BaseModel):
    title: str
    body: str
    id: str

class User(BaseModel):
    username: str

class Post_like_GET(BaseModel):
    is_post_liked: bool
    post_likes: list

class Post_like_POST(BaseModel):
    is_post_liked: bool
