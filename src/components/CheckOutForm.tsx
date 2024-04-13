'use client';

import React, { useState } from 'react';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { Box } from '@mui/material';
import Done from './Done';

type HomeProps = {
    value: boolean;
};

const Home: React.FC<HomeProps> = ({ value }) => {
    const [isUserCheckOut, setIsUserCheckOut] = useState(value);

    return isUserCheckOut ? (
        <form className="bg-gray-100 p-4 rounded-lg shadow space-y-4 m-4">
            <div>
                <label htmlFor="reasonEarly" className="block text-sm font-medium text-gray-700">
                    Reason for Early Checkout
                </label>
                <input
                    type="text"
                    id="reasonEarly"
                    name="reasonEarly"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
            </div>

            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Check Out
            </button>
        </form>
    ) : null;
};
export default Home;
