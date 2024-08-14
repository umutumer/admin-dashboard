import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store';
import { User } from '../types/type';
import { FaTrash } from 'react-icons/fa6';
import { deleteUser, fetchUsers } from '../redux/UserSlice';
import './ModalAnimation.css'
const UsersTable = () => {
    const [selectedId, setSelectedId] = useState<number>(0);
    const [deleteModaVisibility,setDeleteModalVisibility] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state:RootState) => state.users.entities);
    const deleteUserBtn = (id:number) =>{
        setSelectedId(id);
        setDeleteModalVisibility(true);
    }
    const deleteModalCancelBtn = () =>{
        setIsModalVisible(false);
        setTimeout(() => {
            setDeleteModalVisibility(false);
        }, 300);
    }
    const deleteModalConfirmBtn = () =>{
        dispatch(deleteUser(selectedId)).then(()=>{
            fetchUsers();
            setDeleteModalVisibility(false);
        })
    }
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])
    useEffect(() => {
        if (deleteModaVisibility) {
            setTimeout(() => setIsModalVisible(true));
        }
    }, [deleteModaVisibility]);
  return (
    <div className="overflow-x-auto relative w-full">
           <div className='relative flex items-center justify-center'>
            <h3 className='text-5xl text-blue-600 font-semibold my-10'>USERS</h3>
            <h3 className='text-5xl text-blue-600 font-semibold  absolute top-11 opacity-40'>USERS</h3>
            </div>
            <table className="table mt-20">
                <thead>
                    <tr className='text-blue-600 bg-gray-200'>
                        <th>UserName</th>
                        <th>E-Mail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user: User, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                            <td className='py-2 px-4'>{user.username}</td>
                            <td className='py-2 px-4'>{user.mail}</td>
                            <td className='py-2 px-4'>
                                <button className='text-red-600 text-lg' onClick={()=>deleteUserBtn(user.id)}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {deleteModaVisibility && (
                <div className='fixed top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-25 flex items-center justify-center'>
                    <div  className={`flex flex-col items-center bg-white rounded gap-3 w-[400px] h-[200px] transform transition-transform duration-[3s] ${
                            isModalVisible ? "scale-in" : "scale-out"
                        }`}>
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

export default UsersTable