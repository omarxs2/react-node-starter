import { createSlice } from '@reduxjs/toolkit'
import departmentService from '../../../services/departmentService';

export const getDepartments = () => async dispatch => {
    return departmentService.getDepartments().then(res => {
        if (res.response && res.response.success) {
            return dispatch(setDepartments(res.response.data));
        }
    }).catch(errors => {
        return dispatch(setErrors([errors]));
    });
};

export const createDepartment = (data) => async dispatch => {
    return departmentService.createDepartment(data).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};

export const updateDepartment = (data, id) => async dispatch => {
    return departmentService.updateDepartment(data, id).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};

export const deleteDepartment = (id) => async dispatch => {
    return departmentService.deleteDepartment(id).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};


const initialState = {
    departments: [],
    errors: []
}

export const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        setDepartments: (state, action) => {
            state.departments = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDepartments, setErrors } = departmentSlice.actions

export default departmentSlice.reducer;