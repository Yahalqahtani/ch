'use client';

import React, { useEffect, useState } from 'react';

// Assuming the history data follows this structure based on your JSON response.
type HistoryEntry = {
    id: number;
    checkIn: string | null;
    checkOut: string | null;
    reasonLate: string | null;
    reasonEarly: string | null;
    userId: number;
};

const History = () => {
    const [history, setHistory] = useState<HistoryEntry[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `/api/idSession`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                setHistory(data.value);
            } catch (error) {
                console.error('Failed to fetch history:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {history ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    User ID
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Check In
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Check Out
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Reason for Late
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Reason for Leave Earliy
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map(entry => (
                                <tr key={entry.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{entry.userId}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{entry.id}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{entry.checkIn}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {entry.checkOut || '---'}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {entry.reasonLate || '---'}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {entry.reasonEarly || '---'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center">Loading history...</div>
            )}
        </div>
    );
};

export default History;
