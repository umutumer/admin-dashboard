import React from 'react'
import DashboardSideBar from '../components/DashboardSideBar'
import UsersTable from '../components/UsersTable'

const DashboardUser = () => {
  return (
    <div className='bg-gray-100 flex'>
        <DashboardSideBar />
        <UsersTable />
    </div>
  )
}

export default DashboardUser