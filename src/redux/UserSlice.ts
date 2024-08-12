import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/type";


export const fetchUsers = createAsyncThunk('/fetchUsers',
    async () =>{
        const response = await fetch("http://localhost:8080/users");
        return await response.json();
    }
)
export const deleteUser = createAsyncThunk('/user/delete',
    async(userId:number) =>{
        const response = await fetch(`http://localhost:8080/users/${userId}`,{
            method:'DELETE'
        });
        return userId;
    }
)
interface UserState {
    entities: User[],
    loading:'idle' | 'pending' |'succeeded' | 'failed',
    error: string | null;
}

const initialState : UserState ={
    entities: [],
    loading: 'idle',
    error:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(fetchUsers.pending,(state) =>{
            state.loading = 'pending';
        })
        .addCase(fetchUsers.fulfilled,(state,action: PayloadAction<User[]>) =>{
            state.loading ='succeeded';
            state.entities = action.payload;
        })
        .addCase(fetchUsers.rejected,(state,action) =>{
            state.loading = 'failed';
            state.error = action.error.message || "Something went wrong";
        })
        .addCase(deleteUser.fulfilled,(state,action:PayloadAction<number>) =>{
            state.entities = state.entities.filter((user) =>user.id !== action.payload)
        })
    },
})

export default userSlice.reducer;
