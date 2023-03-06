import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../NameSpace';


type InitialState = {
    alert: Boolean,
}

const initialState: InitialState = {
    alert: false,
};

export const errorData = createSlice({
    name: NameSpace.Error,
    initialState,
    reducers: {
        showAlert: (state) => {
            state.alert = true;
        },
        hideAlert: (state) => {
            state.alert = false;
        },
    }
})

export const { showAlert, hideAlert } = errorData.actions;
