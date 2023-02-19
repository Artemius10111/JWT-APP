import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/pages/Home';
import PostDetail from './views/pages/PostDetail';

const AppRoutes = () => {
	return (
      <Routes>		
<Route exact path="/" element={<Home/>}/>
<Route exact path="/postDetail/:postId" element={<PostDetail/>}/>
	</Routes>
	
	)
};

export default AppRoutes;
