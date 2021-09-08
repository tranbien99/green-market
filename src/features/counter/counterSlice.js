import { createSlice} from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increase: (state) => { state.value += 1 },
		decrease: (state) => { state.value -= 1 },
		decreaseByRemove: (state, actions) => {
			state.value = state.value - actions.payload
		}
	}
})

export const {increase, decrease ,decreaseByRemove} = counterSlice.actions

export default counterSlice.reducer