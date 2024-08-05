import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:'user',
    initialState:{
        view:false,
    },
    reducers:{
        selectView:(state)=>{
            state.view=!state.view
        }
    }
})
export const {selectView}=userSlice.actions
export default userSlice.reducer