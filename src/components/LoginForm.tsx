import React, { useState } from 'react'
const LoginForm = () => {
    const adminAccount = {
        name: "admin",
        password: "123456"
    };
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const LoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (adminAccount.name === name && adminAccount.password === password) {
            localStorage.setItem('name', name);
            window.location.href = "/dashboard/home"
        } else if (name === "" || password === "") {
            alert("Fill in all fields")
        } else {
            alert("Name or password is wrong")
        }
    }
    return (
        <form onSubmit={LoginFormSubmit} className='w-[30rem] h-[20rem] bg-white rounded flex flex-col items-center'>
            <h3 className='my-5 text-2xl'>Login Form</h3>
                <label className='text-left w-[90%] py-1' >Name</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className='w-[90%] border rounded px-2 py-1 form-input'
                />
                <label  className='text-left w-[90%] py-1'>Password</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-[90%] border rounded px-2 py-1 form-input'
                />
                <input
                    type='submit'
                    value={"Login"}
                    className='w-[90%] bg-blue-600 my-5 py-1 px-2 rounded text-white'
                />
        </form>
    )
}

export default LoginForm