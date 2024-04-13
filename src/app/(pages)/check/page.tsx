'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { getSession, saveChIn, saveChOut } from '@/actions/actions';

import { getHours, getMinutes } from 'date-fns';

//
async function fetchData(time: null) {
    if (time !== null) {
        try {
            // send time to api return data
            const url = `/api/baseOnDate/${time}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response was successful
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }

            // data json

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

//
const SelectCheckIn = () => {
    const ref = useRef<HTMLFormElement>(null);
    // here how get data here *****
    const [value, setValue] = useState(null);
    const [IsloggedIn, setIsloggedIn] = useState(false);
    const [fetchedData, setFetchedData] = useState();
    const [showCheckoutForm, setShowCkeckoutForm] = useState(false);
    const [showCheckInForm, setShowCkeckInForm] = useState(true);

    //check session

    useEffect(() => {
        const checkLogin = async () => {
            const session = await getSession();
            if (session.isLoggedIn) {
                setIsloggedIn(true);
            } else {
            }
        };

        checkLogin();
    }, []);

    const minTime = new Date(0, 0, 0, 7); //
    const maxTime = new Date(0, 0, 0, 16); //

    const handleChange = (newValue: any) => {
        setValue(newValue);

        fetchData(newValue)
            .then(data => {
                setFetchedData(data.value);
                if (data.value) {
                    setShowCkeckoutForm(true);
                    setShowCkeckInForm(false);
                } else {
                    setShowCkeckInForm(true);
                    setShowCkeckoutForm(false);
                }

                // Update the fetchedData state with the received data
            })
            .catch(error => console.error('Failed to fetch data:', error));
    };
    // see time for late
    const isLate = () => {
        if (!value) return false;
        // Extract hours and minutes
        const hours = getHours(value);

        const minutes = getMinutes(value);
        // Check if the time is after 8:30
        return hours > 8 || (hours === 8 && minutes >= 30);
    };
    // see time for leave early
    const isEarly = () => {
        if (!value) return false;
        // Extract hours and minutes
        const hours = getHours(value);

        const minutes = getMinutes(value);
        // Check if the time is before 3pm
        return hours >= 13 && hours < 15;
    };
    //*****jsx  */

    return (
        <>
            <>
                {/*  start Check in form */}
                {showCheckInForm && IsloggedIn && (
                    <div className="flex justify-center items-center ">
                        <div className="space-y-8">
                            <form
                                ref={ref}
                                action={async FormData => {
                                    ref.current?.reset();
                                    await saveChIn(FormData);
                                }}
                                className="bg-gray-100 p-4 rounded-lg shadow space-y-4 m-4">
                                <DateTimePicker
                                    label="Select Time"
                                    name="time"
                                    value={value}
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    timeSteps={{ minutes: 1 }}
                                    onChange={handleChange}
                                    minTime={minTime}
                                    maxTime={maxTime}
                                    ampm={false}
                                    closeOnSelect={false}
                                />

                                {isLate() && (
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
                )}

                {/*  end Check in form */}
            </>
            {/*  start Check out form */}
            {showCheckoutForm && (
                <div className="flex justify-center items-center ">
                    <div className="space-y-8">
                        <form
                            ref={ref}
                            action={async FormData => {
                                ref.current?.reset();
                                await saveChOut(FormData);
                            }}
                            className="bg-gray-100 p-4 rounded-lg shadow space-y-4 m-4">
                            <DateTimePicker
                                label="Select Time"
                                name="time"
                                value={value}
                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                timeSteps={{ minutes: 1 }}
                                onChange={handleChange}
                                minTime={minTime}
                                maxTime={maxTime}
                                ampm={false}
                                closeOnSelect={false}
                            />

                            {isEarly() && (
                                <div>
                                    <label htmlFor="reasonEarly" className="block text-sm font-medium text-gray-700">
                                        Reason for leave early
                                    </label>
                                    <input
                                        type="text"
                                        id="reasonEarly"
                                        name="reasonEarly"
                                        required
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Check Out
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/*  end Check out form */}
        </>
    );
};

export default SelectCheckIn;
