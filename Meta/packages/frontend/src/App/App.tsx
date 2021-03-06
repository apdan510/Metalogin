import './App.css';

import React from 'react';

import { Login } from '../Login';
import { Profile } from '../Profile/Profile';
import { Auth } from '../types';
import logo from './logo.svg';

const LS_KEY = 'login-with-metamask:auth';

interface State {
	auth?: Auth;
}

export class App extends React.Component<unknown, State> {
	state: State = {};

	componentDidMount() {
		// Access token is stored in localstorage
		const ls = window.localStorage.getItem(LS_KEY);
		const auth = ls && JSON.parse(ls);
		this.setState({
			auth,
		});
	}

	handleLoggedIn = (auth: Auth) => {
		localStorage.setItem(LS_KEY, JSON.stringify(auth));
		this.setState({ auth });
	};

	handleLoggedOut = () => {
		localStorage.removeItem(LS_KEY);
		this.setState({ auth: undefined });
	};

	render() {
		const { auth } = this.state;

		return (
			<div className="App">
				<div className="App-intro">
					{auth ? (
						<Profile
							auth={auth}
							onLoggedOut={this.handleLoggedOut}
						/>
					) : (
						<Login onLoggedIn={this.handleLoggedIn} />
					)}
				</div>
			</div>
		);
	}
}
