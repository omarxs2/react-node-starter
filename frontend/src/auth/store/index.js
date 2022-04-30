import { combineReducers } from '@reduxjs/toolkit';
import loginApp from './loginSlice';

const appReducers = combineReducers({
	loginApp
});

export default appReducers;
