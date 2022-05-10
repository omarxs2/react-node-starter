import { combineReducers } from '@reduxjs/toolkit';
import message from './messageSlice';
import dashboardApp from './dashboardSlice';
import universityApp from './universitySlice';
import departmentApp from './departmentSlice';
import userApp from './userSlice';

const appReducers = combineReducers({
	message,
	dashboardApp,
	universityApp,
	departmentApp,
	userApp
});

export default appReducers;
