import { createSlice } from '@reduxjs/toolkit'
import applicationService from '../../../services/applicationService';

export const getApplications = (role) => async dispatch => {
    return applicationService.getApplications(role).then(res => {
        if (res.response && res.response.success) {
            return dispatch(setApplications(res.response.data));
        }
    }).catch(errors => {
        return dispatch(setErrors(errors));
    });
};

export const getSingleApplication = (id, role) => async dispatch => {
    return applicationService.getSingleApplication(id, role).then(res => {
        if (res.response && res.response.success) {
            return dispatch(setSingleApplication(res.response.data));
        } else {
            return dispatch(setSingleApplication(null));
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

export const updateApplication = (id, data) => async dispatch => {
    return applicationService.updateApplication(id, data).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};


const initialState = {
    applications: [],
    singleApplication: null,
    errors: []
}

export const applicationApp = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setApplications: (state, action) => {
            state.applications = action.payload;
        },
        setSingleApplication: (state, action) => {
            state.singleApplication = action.payload;
        },
        deleteSingleApplication: (state, action) => {
            state.singleApplication = null;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSingleApplication, setApplications, setErrors } = applicationApp.actions

export default applicationApp.reducer;