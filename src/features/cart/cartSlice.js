import { createSlice} from '@reduxjs/toolkit'

export const cartSlice = createSlice({
	name: 'cart',
	initialState: [],
	reducers: {
		addToCart: (state, actions) => {
			const itemExist = state.find((item) => item.id === actions.payload.id)
			if (itemExist) {
				itemExist.quantity++
			} else {
			state.push({...actions.payload, quantity: 1}) 
			}
		},
		increaseQuantity: (state, actions) => {
			const item = state.find((item) => item.id === actions.payload.id)
			item.quantity++
		},
		decreaseQuantity: (state, actions) => {
			const item = state.find((item) => item.id === actions.payload.id)
			item.quantity--
		},
		removeCart: (state, actions) => {
			const index = state.findIndex((item) => item.id === actions.payload.id)
			state.splice(index, 1)
		}
	}
})

export const { addToCart, increaseQuantity, decreaseQuantity, removeCart } = cartSlice.actions

export default cartSlice.reducer