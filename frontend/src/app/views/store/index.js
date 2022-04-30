import { combineReducers } from '@reduxjs/toolkit';
import counter from './counterSlice';

const appReducers = combineReducers({
	counter
});

export default appReducers;
