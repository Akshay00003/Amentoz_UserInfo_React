import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:'user',
    initialState:{
        view:false,
        userId:""
    },
    reducers:{
        selectView:(state)=>{
            state.view=!state.view
        },
        setUserId:(state,action)=>{
            state.userId=action.payload
        }
    }
})
export const {selectView,setUserId}=userSlice.actions
export default userSlice.reducer