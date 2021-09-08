import {getProduct}  from './apis/ProductApi'
import {createSlice} from '@reduxjs/toolkit'

const data = getProduct().then((res) => res.data)

const productSlice = createSlice({
	name: 'products',
	initialState: data,
	reducer: {
		
	}
})