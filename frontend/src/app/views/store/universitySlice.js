import { createSlice } from '@reduxjs/toolkit'
import universityService from '../../../services/universitySevice';

export const getUniversities = () => async dispatch => {
    return universityService.getUniversities().then(res => {
        if (res.response && res.response.success) {
            return dispatch(setUniversities(res.response.data));
        }
    }).catch(errors => {
        return dispatch(setErrors(errors));
    });
};

export const createUniversity = (data) => async dispatch => {
    return universityService.createUniversity(data).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};
const initialState = {
    universities: [],
    errors: []
}

export const updateUniversity = (data, id) => async dispatch => {
    return universityService.updateUniversity(data, id).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};

export const deleteUniversity = (id) => async dispatch => {
    return universityService.deleteUniversity(id).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};


export const universitySlice = createSlice({
    name: 'university',
    initialState,
    reducers: {
        setUniversities: (state, action) => {
            state.universities = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUniversities, setErrors } = universitySlice.actions

export default universitySlice.reducer;