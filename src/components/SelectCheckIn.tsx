'use client';

import React, { useEffect, useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { saveChIn } from '@/actions/actions';
import { format } from 'date-fns-tz';
import { Box, Button, TextField, Typography } from '@mui/material';
import { getHours, getMinutes } from 'date-fns';

//
async function fetchData(time: null) {
    if (time !== null) {
        try {
            // Construct the URL with the query parameter
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

            // Attempt to parse JSON only if the response has content

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

//
const SelectCheckIn = () => {
    // here how get data here *****
    const [value, setValue] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [reason, setReason] = useState('');
    const [fetchedData, setFetchedData] = useState();
    const [showCheckoutForm, seShowCkeckoutForm] = useState(false);

    const minTime = new Date(0, 0, 0, 7); //
    const maxTime = new Date(0, 0, 0, 16); //

    const handleChange = (newValue: any) => {
        setValue(newValue);
        setIsSelected(true);

        fetchData(newValue)
            .then(data => {
                setFetchedData(data.value);

                seShowCkeckoutForm(data.value);

                // Update the fetchedData state with the received data
            })
            .catch(error => console.error('Failed to fetch data:', error));
    };

    const isLate = () => {
        if (!value) return false;
        // Extract hours and minutes
        const hours = getHours(value);

        const minutes = getMinutes(value);
        // Check if the time is after 8:30
        return hours > 8 || (hours === 8 && minutes >= 30);
    };

    return (
        <>
            <>
                {/* Check in form */}

                <form action={saveChIn}>
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
                    />

                    <button
                        type="submit"
                        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                        Check In
                    </button>

                    {value && <div>{format(value, 'PPPpp')}</div>}
                </form>
                {isLate() ? (
                    <>
                        <TextField
                            label="Reason for Being Late"
                            variant="outlined"
                            fullWidth
                            name="reasonLate"
                            onChange={e => setReason(e.target.value)}
                            margin="normal"
                        />
                        <Button variant="contained" color="secondary">
                            Submit Late Check-in
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" color="success">
                        Check-in
                    </Button>
                )}
            </>
            {showCheckoutForm && (
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    noValidate
                    autoComplete="off">
                    <Typography variant="h6" sx={{ m: 2 }}>
                        Check-Out
                    </Typography>
                    <TextField
                        required
                        id="check-out-date"
                        label="Date"
                        type="date"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        required
                        id="check-out-time"
                        label="Time"
                        type="time"
                        defaultValue={new Date().toTimeString().split(' ')[0]}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="secondary">
                        CheckOut
                    </Button>
                </Box>
            )}
        </>
    );
};

export default SelectCheckIn;
