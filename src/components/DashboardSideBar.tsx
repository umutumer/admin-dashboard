import React from 'react'
import { Link } from 'react-router-dom'

const DashboardSideBar = () => {
    return (
        <div className='w-52 min-h-screen bg-white'>
            <Link to={'/dashboard/home'}>
            <h3 className='w-52 text-3xl font-semibold text-center my-20 text-blue-600'>DASHBOARD</h3>
            </Link>
            <div className='w-full flex flex-col items-center'>
                <Link to={'/dashboard/products'} className='w-[90%] py-1 px-2 text-center text-white bg-blue-600 rounded mx-2 my-1 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500 duration-300'>Products</Link>
                <Link to={'/dashboard/users'}  className='w-[90%] py-1 px-2 text-center text-white bg-blue-600 rounded mx-2 my-1 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500 duration-300'>Users</Link>
                <Link to={'/dashboard/orders'}  className='w-[90%] py-1 px-2 text-center text-white bg-blue-600 rounded mx-2 my-1 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500 duration-300'>Orders</Link>
            </div>
        </div>
    )
}

export default DashboardSideBar