/** @format */
/* eslint-disable react/prop-types */

import React, { useRef, useState, useEffect } from 'react';
import './EditProfile.scss';
import { FaChevronLeft } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import Upload from '../images/default.png';
import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Alert, Snackbar, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

const ImagePopup = styled.div`
	width: 50vw;
	height: fit-content;
	position: fixed;
	background: #fff;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: grid;
	justify-content: center;
	z-index: 9999;
	@media screen and (max-width: 500px) {
		width: 90vw;
	}
	& img.ReactCrop__image {
		max-height: 50vh;
	}
`;

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: #000;
	opacity: 0.4;
	z-index: 999;
`;

const baseurl = import.meta.env.VITE_APP_HOST;
const base = import.meta.env.VITE_APP_IMG;
function EditProfile({ setEdit, userDetail, getuserDetail }) {
	const profileRef = useRef(null);
	const [srcImg, setSrcImg] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [profileImgUrl, setProfileImgUrl] = useState('');
	const [userid, setUserid] = useState();
	const [phone, setPhone] = useState('');
	const [username, setName] = useState('');
	const [formattedAdd, setFormattedAdd] = useState([]);
	const [emailErr, setEmailErr] = useState(false);
	//save the image that used to be crop
	const [image, setImage] = useState(null);
	//change the aspect ratio of crop tool as you preferred
	const [crop, setCrop] = useState({ aspect: 1 / 1 });
	//save the resulted image
	const [result, setResult] = useState(null);
	const [profileUpdated, setProfileUpdated] = useState(false);

	const handleImage = async (event) => {
		if (event.target.files[0]) {
			setSrcImg(URL.createObjectURL(event.target.files[0]));
			setCropModal(true);
		}
	};

	const getCroppedImg = async () => {
		try {
			const canvas = document.createElement('canvas');
			const scaleX = image.naturalWidth / image.width;
			const scaleY = image.naturalHeight / image.height;
			canvas.width = crop.width;
			canvas.height = crop.height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(
				image,
				crop.x * scaleX,
				crop.y * scaleY,
				crop.width * scaleX,
				crop.height * scaleY,
				0,
				0,
				crop.width,
				crop.height
			);

			const base64Image = canvas.toDataURL('image/jpeg', 1);
			canvas.toBlob(
				function (blob) {
					let filename = uuidv4();
					var formdata = new FormData();
					formdata.append('files', blob, `${filename}.png`);

					var requestOptions = {
						method: 'POST',
						body: formdata,
						redirect: 'follow',
					};

					fetch(baseurl + '/upload', requestOptions)
						.then((response) => response.json())
						.then((result) => {
							setProfileImgUrl(result[0].url);
							profileRef.current.value = '';
						})
						.catch((error) => console.log('error', error));
				},
				'image/jpeg',
				1
			);
			setResult(base64Image);
		} catch (e) {
			console.log('crop the image');
		}
	};
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setEmailErr(false);
	};
	const handleClosep = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setProfileUpdated(false);
	};

	const [cropModal, setCropModal] = useState(false);

	function getLocation() {
		if (navigator.geolocation) {
			try {
				setIsLoading(true);
				navigator.geolocation.getCurrentPosition(showPosition);
			} catch (error) {
				alert(error);
			}
		} else {
			alert('Geolocation is not supported by this browser.');
		}
	}
	let formatted = [];

	async function showPosition(position) {
		let locationData = await axios.get(
			`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
		);
		let data = await locationData.data;
		let location = data.localityInfo.administrative;

		await location.map((item) => {
			formatted = [item.name, ...formatted];
		});
		console.log(formattedAdd, formatted);
		setIsLoading(false);
		setFormattedAdd(formatted.toString());
	}
	// useEffect(() => {
	// 	setFormattedAdd(formatted);
	// 	console.log('formatted Address ', formattedAdd);
	// }, [formattedAdd]);
	useEffect(() => {
		setName(userDetail?.name);
		setEmail(userDetail?.email);
		setPhone(userDetail?.phone);
		setUserid(userDetail?.id);
		setFormattedAdd(userDetail?.location);
		setProfileImgUrl(userDetail?.image);
	}, [userDetail]);

	const handleSubmit = async (e) => {
		setIsLoading(true);
		let jwt = localStorage.getItem('jwt');
		try {
			e.preventDefault();
			const res = await axios.put(
				baseurl + '/users/' + userid,
				{
					name: username,
					phone,
					location: formattedAdd,
					image: profileImgUrl,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: `Bearer ${jwt}`,
					},
				}
			);
			const data = await res.data;
			console.log(data);
			setIsLoading(false);
			setProfileUpdated(true);
			getuserDetail();
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	return (
		<div id='editprofile'>
			<div className='header'>
				<div className='back' onClick={() => setEdit(false)}>
					<FaChevronLeft size='20px' />
				</div>
				<h3>Edit Profile</h3>
			</div>
			<div className='main'>
				<form onSubmit={handleSubmit}>
					{/* <label htmlFor='Profile'>
						<img src='' alt='' />
					</label>
					<input className='displaynone' type='file' id='Profile' /> */}

					<label htmlFor='Profile'>
						<div
							style={{ position: 'relative', cursor: 'pointer' }}
							title='Upload Profile Picture'>
							{!result ? (
								<div>
									<img
										src={
											profileImgUrl
												? `${base}${profileImgUrl}`
												: Upload
										}
										width={90}
										height={90}
										alt='Profile image'
										style={{ borderRadius: '50px' }}
									/>
								</div>
							) : (
								<div>
									<img
										src={result}
										alt='cropped image'
										width='100px'
										height='100px'
										style={{ borderRadius: '50px' }}
									/>
								</div>
							)}
							<p
								margin='10px 0 0 0'
								style={{ color: 'var(--pri-color)' }}>
								Change Profile Picture
							</p>
						</div>
					</label>
					<input
						type='file'
						accept='image/*'
						id='Profile'
						ref={profileRef}
						onChange={handleImage}
						style={{ display: 'none' }}
					/>
					<div className='dualInput'>
						<TextField
							id='name'
							label='Name'
							variant='outlined'
							fullWidth
							size='mediun'
							type='text'
							required
							margin='dense'
							autoComplete='none'
							value={username}
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							id='phone'
							label='Contact Number'
							variant='outlined'
							fullWidth
							size='mediun'
							type='tel'
							pattern='[0-9]{10}'
							required
							margin='dense'
							autoComplete='none'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div className='dualInput'>
						<div onClick={() => setEmailErr(true)}>
							<TextField
								id='email'
								label='Email'
								variant='outlined'
								fullWidth
								size='mediun'
								type='email'
								disabled
								margin='dense'
								autoComplete='on'
								value={email}
							/>
						</div>
						<div
							onClick={() => {
								formattedAdd.length ? '' : getLocation();
							}}>
							<TextField
								id='location'
								label='Location'
								variant='outlined'
								placeholder={
									isLoading
										? 'Please Wait! Getting your Location...'
										: 'Enter your address'
								}
								fullWidth
								size='mediun'
								type='text'
								required
								margin='dense'
								value={formattedAdd}
								onChange={(e) => setFormattedAdd(e.target.value)}
								autoComplete='none'
							/>
						</div>
					</div>
					<LoadingButton
						loading={isLoading}
						variant='contained'
						size='large'
						type='submit'>
						Update
					</LoadingButton>
				</form>
				<Snackbar
					open={emailErr}
					autoHideDuration={2000}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
					<Alert
						onClose={handleClose}
						severity='warning'
						variant='filled'
						sx={{ width: '100%' }}>
						You are not allowed to change your Email
					</Alert>
				</Snackbar>
				<Snackbar
					open={profileUpdated}
					autoHideDuration={2000}
					onClose={handleClosep}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
					<Alert
						onClose={handleClosep}
						severity='success'
						variant='filled'
						sx={{ width: '100%' }}>
						Profile Updated Sucessfully
					</Alert>
				</Snackbar>
				{cropModal && (
					<div>
						<Backdrop />
						<ImagePopup
							style={{
								display: 'grid',
								justifyContent: 'center',
								background: '#fff',
								padding: '20px',
							}}>
							<div>
								<ReactCrop
									src={srcImg}
									onImageLoaded={setImage}
									crop={crop}
									onChange={(newCrop) => setCrop(newCrop)}
								/>
							</div>
							<div
								style={{
									display: 'grid',
									justifyContent: 'center',
								}}>
								<LoadingButton
									variant='contained'
									size='large'
									style={{ padding: '10px 30px' }}
									onClick={() => {
										getCroppedImg(), setCropModal(false);
									}}
									type='button'>
									crop
								</LoadingButton>
							</div>
						</ImagePopup>
					</div>
				)}
			</div>
		</div>
	);
}

export default EditProfile;
