import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import camelCase from 'camelcase';
import camelcaseKeys from 'camelcase-keys';

const PostDetail = () => {
		const { postId } = useParams();
		const [ post, setPost ] = useState({}); 
		const [ isLike, setLike ] = useState(false);
		const [ postLikeUsers, setPostLikeUsers ] = useState([]);

	useEffect( () => {
		let url_post_detail = `http://localhost/api/social/post_detail/${postId}`;
		axios.get(url_post_detail)
		.then((response) => { setPost(response.data)})
		.catch((error) => {console.log(`error is ${error}`)})

		let url_post_like = `http://localhost/api/social/post_like/${postId}`;
		axios.get(url_post_like)
		.then((response) => {
				let data = camelcaseKeys(JSON.parse(response.data));
				setLike(isLike => data.isPostLiked);
				setPostLikeUsers(postLikeUsers => data.postLikes);		
		})
		.catch((error) => {console.log(`error is ${error}`)})
	},[]);
    
    const setLikeToPost = (e) => { 
			e.preventDefault();
		    setLike(isLike => true); 
	};
    const removeLikeFromPost = (e) => { 
			e.preventDefault();
		    setLike(isLike => false);
	};

	return (
		<div className="postInner">
		<div className="post">
                        <div className={"Post" + post.id} key={post.id}>
                                <p className="postTitle">{post.title}</p>
                                <p className="postBody">{post.body}</p>
                        </div>
						{!isLike && <button onClick={ setLikeToPost } className="postLike">Like</button>}
						{isLike && <button onClick={ removeLikeFromPost } className="postRemoveLike">Remove like</button>} 
		</div>
			
		{ postLikeUsers &&
		<div className="users">
				{
						postLikeUsers.map( postLikeUser => {
						return (
						<div className="user">
								<p className="username">{postLikeUser}</p>
						</div>
						)
						})
				}
		</div>
		}
		</div>
		)
};

export default PostDetail
