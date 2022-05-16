import { createSlice } from '@reduxjs/toolkit'
import applicationService from '../../../services/applicationService';

export const getApplications = (filters) => async dispatch => {
    return applicationService.getApplications(filters).then(res => {
        if (res.response && res.response.success) {
            return dispatch(setApplications(res.response.data));
        }
    }).catch(errors => {
        return dispatch(setErrors(errors));
    });
};

export const createApplication = (data) => async dispatch => {
    return applicationService.createApplication(data).then(res => {
        if (res.response && res.response.success) {
            return res.response;
        }
    }).catch(errors => {
        return false;
    });
};

export const updateApplication = (data, id) => async dispatch => {
    return applicationService.updateApplicatione(data, id).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};


const initialState = {
    applications: [],
    errors: []
}

export const dashboardSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setApplications: (state, action) => {
            state.applications = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setApplications, setErrors } = dashboardSlice.actions

export default dashboardSlice.reducer;