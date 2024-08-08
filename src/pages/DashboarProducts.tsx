import React from 'react'
import DashboardSideBar from '../components/DashboardSideBar'
import ProductsTable from '../components/ProductsTable'

const DashboarProducts = () => {
  return (
    <div className='bg-gray-100 flex'>
      <DashboardSideBar />
      <ProductsTable />
    </div>
  )
}

export default DashboarProducts