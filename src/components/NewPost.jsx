/** @format */

import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Button, TextField } from '@mui/material';
import { BsPlusLg } from 'react-icons/bs';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc);
dayjs.extend(customParseFormat);
const baseurl = import.meta.env.VITE_APP_HOST;
// eslint-disable-next-line react/prop-types
function NewPost({ jwt, getdata }) {
	const [isexpanded, setIsExpanded] = useState(false);
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [error, setError] = useState('');
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const data = await axios.post(
				baseurl + '/posts',
				{ data: { title, desc, date: dayjs.utc().local().format() } },
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
			event.target.reset();
		} catch (error) {
			console.log(error);
			setError(true);
		}
	};
	return (
		<div id='newpost'>
			<Accordion
				expanded={isexpanded}
				onChange={() => setIsExpanded(!isexpanded)}>
				<AccordionSummary
					expandIcon={<BsPlusLg />}
					aria-controls='panel1a-content'
					id='panel1a-header'>
					<p>Create New Post</p>
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
							/>
							<TextField
								id='description'
								label='Post Description'
								variant='outlined'
								fullWidth
								size='small'
								multiline
								rows={2}
								margin='normal'
								required
								onChange={(e) => setDesc(e.target.value)}
							/>
							{error && (
								<p style={{ color: 'red', margin: '5px 0px' }}>
									Error while creating new Post!! Please try again
									later
								</p>
							)}
							<Button variant='contained' type='submit'>
								Create
							</Button>
						</form>
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}

export default NewPost;
