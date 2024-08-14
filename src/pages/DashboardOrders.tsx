import React from 'react'
import DashboardSideBar from '../components/DashboardSideBar'
import OrdersTable from '../components/OrdersTable'

const DashboardOrders = () => {
  return (
    <div className='bg-gray-100 flex'>
        <DashboardSideBar />
        <OrdersTable />
    </div>
  )
}

export default DashboardOrders