import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/type";


export const fetchProducts = createAsyncThunk('/products',
    async () =>{
        const response = await fetch("http://localhost:8080/products")
        return(await response.json())
    },
);
export const updateProduct = createAsyncThunk(
    '/product/update',
    async (updatedProduct: Product) => {
        const response = await fetch(`http://localhost:8080/products/${updatedProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });

        const data = await response.json();
        console.log(data);
        
        return updatedProduct; 
    }
);

    
export const addProduct = createAsyncThunk('/product/add',
    async(newProduct:Omit<Product,'id'>) =>{
        const response = await fetch("http://localhost:8080/products",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newProduct)
        });
        return response.json();
    }
);
export const deleteProduct = createAsyncThunk('/product/delete',
    async(productId:number) =>{
        const response = await fetch(`http://localhost:8080/products/${productId}`,{
            method:'DELETE',

        });
        return productId;
    }
)
interface ProductState {
    entities: Product[],
    loading:'idle' | 'pending' |'succeeded' | 'failed',
    error: string | null;
}

const initialState : ProductState ={
    entities: [],
    loading: 'idle',
    error:null
}


const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(fetchProducts.pending,(state) =>{
            state.loading = 'pending'
        })
        .addCase(fetchProducts.fulfilled, (state,action : PayloadAction<Product[]>) =>{
            state.loading = 'succeeded';
            state.entities = action.payload;
        })
        .addCase(fetchProducts.rejected,(state,action) =>{
            state.loading ='failed';
            state.error = action.error.message || "Something went wrong";
        })
        .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            const index = state.entities.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.entities[index] = action.payload;
            }
        })    
        .addCase(addProduct.fulfilled,(state,action:PayloadAction<Product>) =>{
            state.entities.push(action.payload)
        })
        .addCase(deleteProduct.fulfilled,(state,action:PayloadAction<number>) =>{
            state.entities = state.entities.filter(product => product.id !== action.payload)
        })
    }
})

export default productSlice.reducer;