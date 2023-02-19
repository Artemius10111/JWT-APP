import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<>
			<nav>
				<ul>
					<li className="home-link"><Link to="/">Home</Link></li>
				</ul>
			</nav>
		</>
	);
};

export default Navbar; 
