import React from 'react'
import DashboardSideBar from '../components/DashboardSideBar'
import HomeContainer from '../components/HomeContainer'

const DashboardHome = () => {
  return (
    <div className='bg-gray-100 flex'>
        <DashboardSideBar />
        <HomeContainer />
    </div>
  )
}

export default DashboardHome