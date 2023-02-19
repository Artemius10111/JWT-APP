import React, { useContext, createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './Routes';
import AuthenticationModal from './components/AuthenticationModal'

export const AppContext = createContext()

const Main = () => {
    const [showAuthModal, setShowAuthModal] = useState(false)
    return (
		<BrowserRouter>
			<Navbar/>
			<AppContext.Provider value={[showAuthModal, setShowAuthModal]}> 
			<AuthenticationModal/>
			<AppRoutes/>
			</AppContext.Provider>
		</BrowserRouter>
	)
}
export default Main;
