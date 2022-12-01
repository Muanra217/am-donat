import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price * action.payload.quantity;
        },
        reset: (state) => {
            state.products=[];
            state.quantity = 0;
            state.total = 0;
        },
        removeTodo: (state, action) => {
            console.log(state.products);
            const { id } = action.payload;
            const { price } = action.payload;
            const { quantity } = action.payload;
            // console.log(id);
            const filteredIndex = state.products.findIndex(item => item._id === id)
            state.products.splice(filteredIndex, 1);
            state.quantity -= 1;
            state.total -= price * quantity;
            console.log(action.payload);
         }
    }
})

export const {addProduct, reset, removeTodo} = cartSlice.actions;
export default cartSlice.reducer;