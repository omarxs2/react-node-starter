import { createSlice } from '@reduxjs/toolkit'
import userService from '../../../services/userService';

export const getUsers = () => async dispatch => {
    return userService.getUsers().then(res => {
        if (res.response && res.response.success) {
            return dispatch(setUsers(res.response.data));
        }
    }).catch(errors => {
        return dispatch(setErrors(errors));
    });
};

export const createUser = (data) => async dispatch => {
    return userService.createUser(data).then(res => {
        if (res.response && res.response.success) {
            return res.response.password;
        }
    }).catch(errors => {
        return false;
    });
};

export const updateUser = (data, id) => async dispatch => {
    return userService.updateUser(data, id).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};

export const deleteUser = (id) => async dispatch => {
    return userService.deleteUser(id).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};


const initialState = {
    users: [],
    errors: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUsers, setErrors } = userSlice.actions

export default userSlice.reducer;