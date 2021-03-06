/** @format */

import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Alert, Snackbar, TextField } from '@mui/material';
import { BsPlusLg } from 'react-icons/bs';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { LoadingButton } from '@mui/lab';
import './NewPost.scss';
dayjs.extend(utc);
dayjs.extend(customParseFormat);
const baseurl = import.meta.env.VITE_APP_HOST;
// eslint-disable-next-line react/prop-types
function NewPost({ jwt, getdata }) {
	const [isexpanded, setIsExpanded] = useState(false);
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [error, setError] = useState('');
	const [isloading, setIsloading] = useState(false);
	const [focusOn, setFocusOn] = useState('title');
	const [errorMsg, setErrorMsg] = useState('');
	const handleSubmit = async (event) => {
		try {
			if (desc.length <= 2000 && title.length <= 150) {
				setIsloading(true);
				event.preventDefault();
				const data = await axios.post(
					baseurl + '/posts',
					{ title, desc, date: dayjs.utc().local().format() },
					{
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
							Authorization: `Bearer ${jwt}`,
						},
					}
				);
				console.log(data.data.data);
				setIsExpanded(false);
				getdata(0);
				setError(false);
				setIsloading(false);
				event.target.reset();
			} else if (desc.length > 2000) {
				event.preventDefault();
				setErrorMsg('Description must not be greater than 2000 characters');
			} else if (title.length > 150) {
				event.preventDefault();
				setErrorMsg('Title must not be greater than 150 characters');
			}
		} catch (error) {
			console.log(error);
			setError(true);
			setIsloading(false);
		}
	};
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setErrorMsg(false);
	};
	return (
		<div id='newpost'>
			<Accordion
				expanded={isexpanded}
				onChange={() => setIsExpanded(!isexpanded)}>
				<AccordionSummary
					expandIcon={<BsPlusLg color='#fff' />}
					style={{
						background: '#3976d2',
						color: '#fff',
						borderRadius: '10px 10px 0 0 ',
					}}
					aria-controls='panel1a-content'
					id='panel1a-header'>
					<p>Click Here To Create New Post</p>
				</AccordionSummary>
				<AccordionDetails>
					<div className='postform'>
						<form onSubmit={handleSubmit}>
							<TextField
								id='title'
								label='Post Title'
								variant='outlined'
								fullWidth
								size='small'
								required
								onChange={(e) => setTitle(e.target.value)}
								onClick={() => setFocusOn('title')}
							/>
							<TextField
								id='description'
								label='Post Description'
								variant='outlined'
								fullWidth
								size='small'
								multiline
								rows={3}
								margin='normal'
								required
								onChange={(e) => {
									setDesc(e.target.value);
									console.log(desc.length);
								}}
								onClick={() => setFocusOn('desc')}
							/>
							{focusOn === 'desc' ? (
								<p
									className={
										desc.length > 2000 ? 'wordcount red' : 'wordcount'
									}>
									{desc.length} / 2000
								</p>
							) : (
								<p
									className={
										title.length > 150 ? 'wordcount red' : 'wordcount'
									}>
									{title.length} / 150
								</p>
							)}
							{error && (
								<p style={{ color: 'red', margin: '5px 0px' }}>
									Error while creating new Post!! Please try again
									later
								</p>
							)}
							<LoadingButton
								loading={isloading}
								variant='contained'
								type='submit'>
								Create
							</LoadingButton>
						</form>
						<Snackbar
							open={errorMsg}
							autoHideDuration={4000}
							onClose={handleClose}
							anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
							<Alert
								onClose={handleClose}
								severity='error'
								variant='filled'
								sx={{ width: '100%' }}>
								{errorMsg}
							</Alert>
						</Snackbar>
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}

export default NewPost;
