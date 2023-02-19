import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { AppContext } from '../../Main';

const Home = () => {
	const [showAuthModal, setShowAuthModal] = useContext(AppContext);
    const [posts, setPosts ] = useState([]); 
	let url = ("http://localhost/api/social/post_list/")
	 useEffect(() => {
    axios.get(url)
      .then((response) => {
	setPosts(response.data);
      	})
      .catch((error) => {
        console.log("ERROR: ", error);
      
      });
  }, []);
	console.log(1)

	return (
		<div className="posts">
		{ posts.map( post =>  
		    {
		    return (<div className={"Post" + post.id} key={post.id}>
				<Link to={`/postDetail/${post.id}`}>
				<p className="postTitle">{post.title}</p>
				</Link>
				<p className="postBody">{post.body}</p>
			</div>
		)})}
		<button onClick={ () =>  setShowAuthModal(!showAuthModal)}>Show modal</button>
		</div>	
	)
};

export default Home;
