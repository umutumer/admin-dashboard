import React, { useEffect, useState } from 'react'
import { addProduct, deleteProduct, fetchProducts, updateProduct } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Product } from '../types/type';
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const ProductsTable = () => {
    const [modalVisibility, setModalVisibilty] = useState<boolean>(false);
    const [deleteModaVisibility,setDeleteModalVisibility] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [base64Image, setBase64Image] = useState<string>("");
    const [explanation, setExplanation] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [selectedId, setSelectedId] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.entities);



    const addProductBtn = () => {
        setModalVisibilty(true);
    }
    const updateProductBtn = (prodId: number, prodName: string, prodExplanation: string, prodPrice: number, prodImg: string) => {
        setSelectedId(prodId);
        setName(prodName);
        setExplanation(prodExplanation);
        setPrice(prodPrice);
        setBase64Image(prodImg)
        setModalVisibilty(true)
    }
    const modalCancelBtn = () => {
        setModalVisibilty(false);
        setName("");
        setBase64Image("");
        setExplanation("");
        setPrice(0);
        setSelectedId(0)
    }
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newData = {
            name: name,
            base64Image: base64Image,
            explanation: explanation,
            price: price,
        }
        const updatedData = {
            id: selectedId,
            name: name,
            base64Image: base64Image,
            explanation: explanation,
            price: price
        }
        if (selectedId !== 0) {
            dispatch(updateProduct(updatedData)).then(() => {
                setModalVisibilty(false);
                dispatch(fetchProducts());
                setName("");
                setBase64Image("");
                setExplanation("");
                setPrice(0);
                setSelectedId(0)
            })
        } else {
            dispatch(addProduct(newData)).then(() => {
                setModalVisibilty(false);
                dispatch(fetchProducts());
                setName("");
                setBase64Image("");
                setExplanation("");
                setPrice(0);
            })
        }
    }
    const deleteProductBtn = (id:number) =>{
        setSelectedId(id);
        setDeleteModalVisibility(true);
    }
    const deleteModalCancelBtn = () =>{
        setSelectedId(0);
        setDeleteModalVisibility(false);
    }
    const deleteModalConfirmBtn = () =>{
        dispatch(deleteProduct(selectedId)).then(()=>{
            fetchProducts();
            setDeleteModalVisibility(false);
        })
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const image = reader.result as string;
                setBase64Image(image);
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])
    return (
        <div className="overflow-x-auto relative w-full">
            <div className='relative flex items-center justify-center'>
            <h3 className='text-5xl text-blue-600 font-semibold my-10'>PRODUCTS</h3>
            <h3 className='text-5xl text-blue-600 font-semibold  absolute top-11 opacity-40'>PRODUCTS</h3>
            </div>
            <button className='absolute top-25 right-5 px-2 py-1 bg-blue-600 text-white rounded' onClick={addProductBtn}>Add Product</button>
            <table className="table mt-20">
                <thead>
                    <tr className='text-blue-600 bg-gray-200'>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Explanation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product: Product, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                            <td className='py-2 px-4'>{product.name}</td>
                            <td className='py-2 px-4'><img src={product.base64Image} alt={product.name} className='w-32' /></td>
                            <td className='py-2 px-4'>{product.price}₺</td>
                            <td className='py-2 px-4'> {product.explanation && product.explanation.length > 500
                                ? product.explanation.substring(0, 500) + "..."
                                : product.explanation}</td>
                            <td className='py-2 px-4 flex'>
                                <button className='mr-4 text-blue-600 text-lg' onClick={() => updateProductBtn(product.id, product.name, product.explanation, product.price, product.base64Image)}><FaPenToSquare /></button>
                                <button className='text-red-600 text-lg' onClick={()=>deleteProductBtn(product.id)}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {modalVisibility && (
                <div className='fixed top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-25 flex items-center justify-center'>
                    <form onSubmit={formSubmit} className='flex flex-col items-center bg-white rounded gap-3 w-[400px] h-[600px] relative'>
                        <button className='absolute text-2xl font-bold top-3 right-3 text-blue-600' onClick={modalCancelBtn}><MdCancel /></button>
                        <h3 className='text-2xl font-semibold my-5 text-blue-600'>{selectedId !== 0 ? 'Update Product' : 'Add Product'}</h3>
                        <label className='w-[90%] text-blue-600'>Product Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-[90%] border py-1 px-2 rounded' required />
                        <label className='w-[90%] text-blue-600'>Explanation</label>
                        <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} className='w-[90%] min-h-32 max-h-32 border py-1 px-2 rounded' required />
                        <label className='w-[90%] text-blue-600'>Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} className='w-[90%] border py-1 px-2 rounded' required />
                        <label className='w-[90%] text-blue-600'>Image</label>
                        <input type="file" className="file-input-primary file-input w-full max-w-[90%]" onChange={(e) => handleFileChange(e)} />
                        <input type="submit" value={selectedId !== 0 ? 'Update' : 'Add'} className='w-[90%] bg-blue-600 py-1 px-2 text-white rounded mt-5' />
                    </form>
                </div>
            )}
            {deleteModaVisibility && (
                <div className='fixed top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-25 flex items-center justify-center'>
                    <div className='flex flex-col items-center bg-white rounded gap-3 w-[400px] h-[200px]'>
                        <p className='my-10 text-xl'>Are you sure you want to delete ?</p>
                        <div className='flex justify-around w-full'>
                            <button onClick={deleteModalConfirmBtn} className='border border-blue-600 bg-blue-600 text-white w-32 py-1 px-2 rounded hover:bg-white hover:text-blue-600  duration-300'>Confirm</button>
                            <button onClick={deleteModalCancelBtn} className='border border-blue-600 text-blue-600 w-32 py-1 px-2 rounded hover:bg-blue-600 hover:text-white duration-300'>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductsTable;