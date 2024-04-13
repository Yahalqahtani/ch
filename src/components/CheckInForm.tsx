'use client';

import React, { useState } from 'react';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { Box } from '@mui/material';
import Done from './Done';
import { saveChIn } from '@/actions/actions';

type checkProps = {
    userCkeckIn: any;
    userCheckOut: any;
    time: any;
    late: any;
    early: any;
};

const Home: React.FC<checkProps> = ({ userCkeckIn, userCheckOut, time, late, early }) => {
    const [isUserCheckin, setIsUserCheckin] = useState(userCkeckIn);
    const [timevalue, setTimeValue] = useState(time);
    const [islate, setislate] = useState(late);

    return isUserCheckin ? (
        <div className="flex justify-center items-center ">
            <div className="space-y-8">
                {/* Form 1: Check-In */}
                <form action={saveChIn} className="bg-gray-100 p-4 rounded-lg shadow space-y-4 m-4">
                    <input name="time" value={timevalue} className="" disabled />
                    {islate && (
                        <div>
                            <label htmlFor="reasonLate" className="block text-sm font-medium text-gray-700">
                                Reason for Late
                            </label>
                            <input
                                type="text"
                                id="reasonLate"
                                name="reasonLate"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Check In
                    </button>
                </form>
            </div>
        </div>
    ) : null;
};
export default Home;
