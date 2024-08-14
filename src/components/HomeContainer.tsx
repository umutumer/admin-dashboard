import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchUsers } from '../redux/UserSlice'
import { fetchOrders } from '../redux/orderSlice'
import { FaUser } from 'react-icons/fa6'
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { Link } from 'react-router-dom'

const HomeContainer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.users.entities);
    const orders = useSelector((state: RootState) => state.orders.entities);
    console.log(orders && orders.length);
    console.log(users && users.length);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchOrders());
    }, [dispatch])
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center'>
            <div className='flex w-[30rem] justify-between my-10'>
                <Link to={'/dashboard/users'} className='w-56 h-56 bg-white flex items-center justify-center rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl duration-300'>
                    <p className='flex items-center justify-center text-3xl text-blue-600'><FaUser />{users && users.length}</p>
                </Link>
                <Link to={'/dashboard/orders'} className='w-56 h-56 bg-white flex items-center justify-center rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl duration-300'>
                    <p className='flex items-center justify-center text-3xl text-blue-600'><FaShippingFast /> {orders && orders.length}</p>
                </Link>
            </div>
            <Link to={'/dashboard/products'} className='w-[30rem] h-56 bg-white flex items-center justify-center rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl duration-300'>
                <p className='flex items-center justify-center text-3xl text-blue-600'><AiOutlineProduct /> Product</p>
            </Link>
        </div>
    )
}

export default HomeContainer