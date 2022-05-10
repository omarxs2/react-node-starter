import { createSlice } from '@reduxjs/toolkit'
import priceService from '../../../services/priceService';

export const getPrices = (filters) => async dispatch => {
    return priceService.getPrices(filters).then(res => {
        if (res.response && res.response.success) {
            return dispatch(setPrices(res.response.data));
        }
    }).catch(errors => {
        return dispatch(setErrors(errors));
    });
};

export const createPrice = (data) => async dispatch => {
    return priceService.createPrice(data).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};

export const updatePrice = (data, id) => async dispatch => {
    return priceService.updatePrice(data, id).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};

export const deletePrice = (id) => async dispatch => {
    return priceService.deletePrice(id).then(res => {
        if (res.response && res.response.success) {
            return true;
        }
    }).catch(errors => {
        return false;
    });
};

const initialState = {
    prices: [],
    errors: []
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setPrices: (state, action) => {
            state.prices = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setPrices, setErrors } = dashboardSlice.actions

export default dashboardSlice.reducer;