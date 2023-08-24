import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState ={
	goals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	msg: ""
}

// Create new goal
export const createGoal = createAsyncThunk("goals/create", async(goalData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await goalService.create(goalData, )
	} catch (err) {
		const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString() 
    return thunkAPI.rejectWithValue(message)
	}
})

export const goalSlice = createSlice({
	name: "goal",
  initialState,
  reducers: {
		reset: (state) => initialState,
		extraReducer: (builder) => {
			builder
				.addCase(createGoal.pending, (state) => {
					state.isLoading = true
				})
				.addCase(createGoal.fulfilled, (state, action) => {
					state.isLoading = false
					state.isSuccess = true
					state.goals.push(action.payload)
				})
				.addCase(createGoal.rejected, (state, action) => {
					state.isLoading = false
					state.isError = true
					state.msg = action.payload
				})
		}
	}
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer