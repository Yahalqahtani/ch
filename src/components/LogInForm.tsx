'use client';
import { Login } from '@/actions/actions';
import { Divider } from '@mui/material';
import Link from 'next/link';
import React, { useRef } from 'react';

const LoginForm = () => {
    const ref = useRef<HTMLFormElement>(null);

    return (
        <>
            <form
                className=" md:items-center mb-6 max-w-sm bg-slate-100 m-8 shadow-md animate-jump  "
                ref={ref}
                action={async FormData => {
                    ref.current?.reset();
                    await Login(FormData);
                }}>
                <Divider className="py-5">LogIn</Divider>
                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 m-3">Username</label>
                    </div>
                    <div className="md:w-2/3 m-3">
                        <input
                            id="username"
                            name="username"
                            required
                            placeholder="Username"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text"
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 m-3">Password</label>
                    </div>
                    <div className="md:w-2/3 m-3">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            placeholder="********"
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className=" flex justify-center">
                        <button
                            className="shadow justify-center bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-3"
                            type="submit">
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
export default LoginForm;
