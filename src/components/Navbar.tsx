'use client';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import { List } from '@mui/material';
import Link from 'next/link';
import { getSession } from '@/actions/actions';
import LoginPage from '@/app/login/page';
import LogOutForm from './LogOutForm';

//

//
const Navbar = () => {
    const [nav, setNav] = useState(false);

    // State to manage the navbar's visibility

    // Toggle function to handle the navbar's display
    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className="bg-slate-800 flex justify-between items-center h-16 max-w-2xl mx-auto px-4 text-white ">
            {/* Logo */}
            <h1 className="w-14 text-3xl font-bold text-slate-400">Y</h1>

            {/* Desktop Navigation */}
            <List className="hidden md:flex">
                <Link href="/">
                    <button className="p-2 m-2 cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-slate-700">
                        Home
                    </button>
                </Link>
                <Link href="/check">
                    <button className="p-2 m-2 cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-slate-700">
                        Check Today
                    </button>
                </Link>
                <Link href="/myHistory">
                    <button className="p-2 m-2 cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-slate-700">
                        Attendance history
                    </button>
                </Link>
                <Link href="/dashboard">
                    <button className="p-2 m-2 cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-slate-700">
                        Admin
                    </button>
                </Link>
            </List>

            {/* Mobile Navigation Icon */}
            <div onClick={handleNav} className="block md:hidden">
                {nav ? <ClearIcon /> : <MenuIcon />}
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={
                    nav
                        ? 'fixed md:hidden left-0 top-0 w-[50%] h-full bg-slate-800 flex flex-col items-start ease-in-out duration-500'
                        : 'fixed top-0 bottom-0 left-[-100%] w-[60%] ease-in-out duration-500 flex flex-col items-start'
                }>
                {/* Mobile Navigation Items */}

                <Link href="/">
                    <span className="p-4 m-2 cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-slate-700">
                        Home
                    </span>
                </Link>
                <Link href="/check">
                    <span className="p-4 m-2 cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-slate-700">
                        Check Today
                    </span>
                </Link>
                <Link href="/myHistory">
                    <span className="p-4 m-2 cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-slate-700">
                        Attendance history
                    </span>
                </Link>
                <Link href="/dashboard">
                    <span className="p-4 m-2 cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-slate-700">
                        Admin
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
