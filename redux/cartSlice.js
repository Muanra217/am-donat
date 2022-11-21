import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        notes: '',
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price * action.payload.quantity;
            state.notes = action.payload.notes;
        },
        reset: (state) => {
            state.products=[];
            state.quantity = 0;
            state.total = 0;
            state.notes = '';
        }
    }
})

export const {addProduct, reset} = cartSlice.actions;
export default cartSlice.reducer;