import React from 'react';

import { LogOut } from '@/actions/actions';

const LogOutForm = () => {
    return (
        <>
            <form action={LogOut}>
                <button className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded m-4">Logout</button>
            </form>
        </>
    );
};

export default LogOutForm;
