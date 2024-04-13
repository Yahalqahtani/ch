import { Box } from '@mui/material';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import React from 'react';

const Done = () => {
    return (
        <div className="flex justify-center">
            <Box
                className="relative flex justify-center items-center p-10 bg-white shadow-lg rounded-lg "
                style={{ width: 350, height: 350 }}>
                <AssignmentTurnedInOutlinedIcon
                    className="absolute"
                    color="success"
                    style={{ fontSize: 200, opacity: 0.2 }} // Icon size and opacity
                />
                <div className="text-slate-300 justify-center text-center text-lg mt-48">Done For Today</div>
            </Box>
        </div>
    );
};

export default Done;
