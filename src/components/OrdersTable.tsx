import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchOrders, updateOrderStatus } from '../redux/orderSlice';
import { Order } from '../types/type';
import { FaPenToSquare } from 'react-icons/fa6';
import './ModalAnimation.css'
const OrdersTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.orders.entities);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [orderUsername, setOrderUsername] = useState<string>("");
    const [orderProductName, setOrderProductName] = useState<string>("");
    const [orderStatus, setOrderStatus] = useState<string>("");

    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const editBtn = (id: number, username: string, prodName: string, status: string) => {
        setSelectedId(id);
        setOrderUsername(username);
        setOrderProductName(prodName);
        setOrderStatus(status);
        setModalVisibility(true);
    };

    const modalCancelBtn = () => {
        setIsModalVisible(false);
        setTimeout(() => {
            setModalVisibility(false);
            setSelectedId(0);
            setOrderUsername("");
            setOrderProductName("");
            setOrderStatus("");
        }, 300);
    };

    const modalUpdateBtn = () => {
        const updatedOrder = {
            id: selectedId,
            username: orderUsername,
            productName: orderProductName,
            status: orderStatus,
        };
        dispatch(updateOrderStatus(updatedOrder)).then(() => {
            modalCancelBtn();
        });
    };

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    useEffect(() => {
        if (modalVisibility) {
            setTimeout(() => setIsModalVisible(true));
        }
    }, [modalVisibility]);

    return (
        <div className="overflow-x-auto relative w-full">
            <div className="relative flex items-center justify-center">
                <h3 className="text-5xl text-blue-600 font-semibold my-10">ORDERS</h3>
                <h3 className="text-5xl text-blue-600 font-semibold absolute top-11 opacity-40">ORDERS</h3>
            </div>
            <table className="table mt-20">
                <thead>
                    <tr className="text-blue-600 bg-gray-200">
                        <th>Username</th>
                        <th>Product Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order: Order, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                            <td className="py-2 px-4">{order.username}</td>
                            <td className="py-2 px-4">{order.productName}</td>
                            <td className="py-2 px-4">{order.status}</td>
                            <td className="py-2 px-4">
                                <button
                                    className="text-blue-600 text-lg"
                                    onClick={() => editBtn(order.id, order.username, order.productName, order.status)}
                                >
                                    <FaPenToSquare />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalVisibility && (
                <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-25 flex items-center justify-center">
                    <div
                        className={`flex flex-col items-center bg-white rounded gap-3 w-[400px] h-[250px] transform transition-transform duration-[3s] ${
                            isModalVisible ? "scale-in" : "scale-out"
                        }`}
                    >
                        <p className="my-10 text-xl">Change the status</p>
                        <select
                            name=""
                            id=""
                            onChange={(e) => setOrderStatus(e.target.value)}
                            className="border py-1 px-2 rounded mb-5"
                        >
                            <option value="your order has been received">Order Received</option>
                            <option value="your order has been processed">Order Processed</option>
                            <option value="your order has been shipped">Order Shipped</option>
                            <option value="your order has been delivered">Order Delivered</option>
                        </select>
                        <div className="flex justify-around w-full">
                            <button
                                onClick={modalUpdateBtn}
                                className="border border-blue-600 bg-blue-600 text-white w-32 py-1 px-2 rounded hover:bg-white hover:text-blue-600 duration-300"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={modalCancelBtn}
                                className="border border-blue-600 text-blue-600 w-32 py-1 px-2 rounded hover:bg-blue-600 hover:text-white duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersTable;
