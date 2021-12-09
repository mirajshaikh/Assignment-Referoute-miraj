/** @format */
/* eslint-disable react/prop-types */

import { Alert, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import './Login.scss';
const baseurl = import.meta.env.VITE_APP_HOST;
import LoadingButton from '@mui/lab/LoadingButton';

function LoginForm({
	handlesubmit,
	setIdentifier,
	setPassword,
	hasError,
	errMsg,
	changeForm,
	isLoading,
}) {
	return (
		<div id='login'>
			<div className='container'>
				<h1>Login</h1>
				<h2>
					Welcome Back <span style={{ fontSize: '35px' }}>✌️</span>
				</h2>
				<form onSubmit={handlesubmit}>
					<TextField
						id='title'
						label='Username'
						variant='outlined'
						fullWidth
						size='medium'
						required
						onChange={(e) => setIdentifier(e.target.value)}
					/>
					<TextField
						id='password'
						label='Password'
						variant='outlined'
						fullWidth
						size='medium'
						type='password'
						required
						margin='normal'
						onChange={(e) => setPassword(e.target.value)}
					/>
					{hasError && <p className='errorMsg'>{errMsg}</p>}
					<LoadingButton
						loading={isLoading}
						variant='contained'
						size='large'
						type='submit'>
						Login
					</LoadingButton>
					<p className='noaccount'>
						Don&apos;t have an account yet?{' '}
						<span
							onClick={() => {
								changeForm('Register');
							}}>
							Register here
						</span>
					</p>
				</form>
			</div>
		</div>
	);
}

function Login({ setLoggedin, setJwt }) {
	const [Form, setForm] = useState('Login');
	const [hasError, setHasError] = useState(false);
	const [errMsg, setErrMsg] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	// Login
	const [password, setPassword] = useState('');
	const [identifier, setIdentifier] = useState('');
	// Register
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [regPass, setRegPass] = useState('');
	const [cnfPass, setCnfPass] = useState('');
	const [open, setOpen] = useState(false);

	const handlesubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			const res = await axios.post(baseurl + '/auth/local', {
				identifier,
				password,
			});
			const data = res.data;
			console.log('data', data);
			setLoggedin(true);
			localStorage.setItem('jwt', data.jwt);
			setJwt(data.jwt);
			setIsLoading(false);
		} catch (error) {
			setHasError(true);
			console.log(error.response);
			setIsLoading(false);
			if (
				error?.response?.data?.error?.message ===
				'Invalid identifier or password'
			) {
				setErrMsg('Invalid Username or Password');
			} else {
				setErrMsg('Something went wrong! Please Try Again later');
			}
		}
	};
	const handleRegister = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		if (regPass.length >= 6) {
			if (regPass === cnfPass) {
				try {
					setHasError(false);
					const res = await axios.post(baseurl + '/auth/local/register', {
						name,
						email,
						phone,
						password: regPass,
					});
					const data = await res.data;
					console.log(data);
					setForm('Login');
					setOpen(true);
					setIsLoading(false);
				} catch (error) {
					setIsLoading(false);
					setHasError(true);
					console.log(error?.response.data.error.message);
					setErrMsg(error?.response.data.error.message);
				}
			} else {
				setIsLoading(false);
				setHasError(true);
				setErrMsg('Confirm Password must be same as Password');
			}
		} else {
			setIsLoading(false);
			setHasError(true);
			setErrMsg('Password Must be 6 character long');
		}
	};

	const changeForm = (form) => {
		setForm(form);
		setHasError(false);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert
					onClose={handleClose}
					severity='success'
					variant='filled'
					sx={{ width: '100%' }}>
					Register Succesfully
				</Alert>
			</Snackbar>
			{Form === 'Login' ? (
				<LoginForm
					setPassword={setPassword}
					hasError={hasError}
					errMsg={errMsg}
					setIdentifier={setIdentifier}
					handlesubmit={handlesubmit}
					changeForm={changeForm}
					isLoading={isLoading}
				/>
			) : (
				<div id='login'>
					<div className='container register'>
						<h1>Register</h1>
						<h2>
							Let&apos;s create your account{' '}
							<span style={{ fontSize: '35px' }}>✌️</span>
						</h2>
						<form onSubmit={handleRegister}>
							<TextField
								id='name'
								label='Name'
								variant='outlined'
								fullWidth
								size='small'
								margin='dense'
								required
								onChange={(e) => setName(e.target.value)}
							/>
							<TextField
								id='phone'
								label='Contact Number'
								variant='outlined'
								fullWidth
								size='small'
								type='tel'
								pattern='[0-9]{10}'
								required
								margin='dense'
								onChange={(e) => setPhone(e.target.value)}
							/>
							<TextField
								id='email'
								label='Email id'
								placeholder='This will be your Username'
								variant='outlined'
								fullWidth
								size='small'
								type='email'
								required
								margin='dense'
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								id='password'
								label='Password'
								variant='outlined'
								fullWidth
								size='small'
								type='password'
								required
								margin='dense'
								onChange={(e) => setRegPass(e.target.value)}
							/>
							<TextField
								id='cnfPassword'
								label='Confirm Password'
								variant='outlined'
								fullWidth
								size='small'
								type='password'
								required
								margin='dense'
								onChange={(e) => setCnfPass(e.target.value)}
							/>
							{hasError && <p className='errorMsg'>{errMsg}</p>}
							<LoadingButton
								loading={isLoading}
								variant='contained'
								size='large'
								type='submit'>
								Register
							</LoadingButton>
						</form>
						<p className='noaccount'>
							Already have an account?{' '}
							<span onClick={() => changeForm('Login')}>Login here</span>
						</p>
					</div>
				</div>
			)}
		</>
	);
}

export default Login;
