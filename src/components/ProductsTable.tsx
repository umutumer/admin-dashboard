import React, { useEffect, useState } from 'react'
import { addProduct, fetchProducts, updateProduct } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Product } from '../types/type';
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const ProductsTable = () => {
    const [modalVisibility, setModalVisibilty] = useState<boolean>(false);
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
    const updateProductBtn = (prodId: number, prodName: string, prodExplanation: string, prodPrice: number) => {
        setSelectedId(prodId);
        setName(prodName);
        setExplanation(prodExplanation);
        setPrice(prodPrice);
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
            <button className='absolute top-5 right-5 px-2 py-1 bg-blue-600 text-white rounded' onClick={addProductBtn}>Add Product</button>
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
                            <td className='py-2 px-4'>{product.explanation.length > 500 ? product.explanation.substring(0, 500) + "..." : product.explanation}</td>
                            <td className='py-2 px-4 flex'>
                                <button className='mr-4 text-blue-600 text-lg' onClick={() => updateProductBtn(product.id, product.name, product.explanation, product.price)}><FaPenToSquare /></button>
                                <button className='text-red-600 text-lg'><FaTrash /></button>
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
        </div>
    )
}

export default ProductsTable;