import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../types/type";


export const fetchOrders = createAsyncThunk('fetchOrders',
    async () =>{
        const response = await fetch("http://localhost:8080/orders")

        return await response.json();
    }
);

export const updateOrderStatus = createAsyncThunk('order/statusUpdate',
    async(updatedOrder:Order) =>{
        const response = await fetch(`http://localhost:8080/orders${updatedOrder.id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'pplication/json'
            },
            body:JSON.stringify(updatedOrder)
        })
        const data = await response.json();
        console.log(data);
        
        return updatedOrder;
    }
)

interface OrderState {
    entities: Order[],
    loading:'idle' | 'pending' |'succeeded' | 'failed',
    error: string | null;
}

const initialState : OrderState ={
    entities: [],
    loading: 'idle',
    error:null
}

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(fetchOrders.pending,(state) =>{
            state.loading = 'pending';
        })
        .addCase(fetchOrders.fulfilled,(state,action:PayloadAction<Order[]>) =>{
            state.loading = 'succeeded';
            state.entities = action.payload;
        })
        .addCase(fetchOrders.rejected,(state,action) =>{
            state.loading = 'failed';
            state.error = action.error.message || "Something went wrong";
        })
        .addCase(updateOrderStatus.fulfilled,(state,action:PayloadAction<Order>)=>{
            const index = state.entities.findIndex((order) =>order.id === action.payload.id)
            if (index !== -1) {
                state.entities[index] = action.payload;
            }
        })
    },
})

export default orderSlice.reducer;