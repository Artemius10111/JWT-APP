import React, { useEffect, useRef, useReducer, useCallback, useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AppContext } from '../Main';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from 'react-jwt';

const reducer = (state, action) => {
		switch (action.type) {
				case "login":	
						return { isRegister: false, isLogin: true};
				case "register":
						return { isRegister: true, isLogin: false};
		};
};

const AuthenticationModal = () => {
		const [showAuthModal, setShowAuthModal] = useContext(AppContext);
		const [state, dispatch] = useReducer(reducer, {isRegister: false, isLogin: true})
		const loginUsername = useRef();
		const loginPassword = useRef();
		const [ authCookies, setAuthCookie ] = useCookies(['access', 'refresh']);
		
		const loginFormHandler = useCallback(
				() => (e) => {
				e.preventDefault();
				let url = `http://localhost/api/api/token/`
				axios.post(url, {
						username: loginUsername.current.value,
						password: loginPassword.current.value,
				})
				.then( (response) => {
				let data = response.data;
				setAuthCookie('access', data.access);
				setAuthCookie('refresh', data.refresh);
				console.log(decodeToken(data.access));
				})
				.catch( (error) => {
						console.log(`error is ${error}`)
				});	
		}, [])
		return (
				<Modal className="authenticationModal" show={showAuthModal}> 
				<div className="authenticationModalInner"> { state.isLogin && <div className="loginModal"> 
						<form onSubmit={ loginFormHandler() }> 
						<label> Username: <input ref={ loginUsername } placeholder="type here"/> </label> 
						<label> Password <input ref={ loginPassword } placeholder="type here"/></label>	
						<button className="loginPost" type="submit">Login</button>
						</form>
						<p className="toRegisterTitle">{ () => "Don't have any account?"}</p>
						<button className="toRegister" onClick= { () => { dispatch({type: "register"}) }}>Register</button>
						</div> 
						}
						{ state.isRegister &&
						<div className="registerModal">
						<form>
								<label className="usernameLabel">
								Username:
								<input placeholder="type here"/>
								</label>
								<label className="emailLabel">
								Email:
										<input placeholder="type here"/>
								</label>
								<label className="passwordLabel">
								Password:
								<input placeholder="type here"/>
								</label>
								<label className="repeatPasswordLabel">
								Repeat Password:
								<input placeholder="type here"/>
								</label>
						</form>
						<p className="toLoginTitle">{ () => "Have account?"}</p>
						<button className="toLogin" onClick= { () => { dispatch({type: "login"})} }>Login</button>
						</div>
						}
				</div>
				</Modal>
		)
};

export default AuthenticationModal;
