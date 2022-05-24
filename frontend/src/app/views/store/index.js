import { combineReducers } from '@reduxjs/toolkit';
import message from './messageSlice';
import dashboardApp from './dashboardSlice';
import universityApp from './universitySlice';
import departmentApp from './departmentSlice';
import userApp from './userSlice';
import applicationApp from './applicationSlice';

const appReducers = combineReducers({
	message,
	dashboardApp,
	universityApp,
	departmentApp,
	userApp,
	applicationApp
});

export default appReducers;
