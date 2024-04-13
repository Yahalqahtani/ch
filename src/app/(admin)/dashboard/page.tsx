'use client';
import React, { useEffect, useState } from 'react';

import EditUser from '@/components/EditUser';
import Card from '@/components/Card';
import { getSession } from '@/actions/actions';

type User = {
    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
};

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assume getSession is required before making the API call
                const session = await getSession();
                if (session.isAdmin) {
                    // Check if the session is valid
                    const url = '/api/allUsers';
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setUsers(data.value);
                } else {
                    console.error('No session found.');
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchData();
    }, []);

    const handleSave = async (userId: number, updatedUser: User) => {
        try {
            const url = `api/${userId}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedUserData = await response.json();

            setUsers(users.map(user => (user.id === userId ? { ...user, ...updatedUser } : user)));

            console.log('User updated successfully:', updatedUserData);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    return (
        <>
            <div className="mb-9 flex text-center items-center justify-center text-2xl">All Users</div>
            <div className="grid grid-cols-1 justify-center">
                {users.map(user => (
                    <Card key={user.id} user={user} onEdit={() => setEditingUser(user)} />
                ))}
            </div>
            {editingUser && <EditUser user={editingUser} onSave={handleSave} onClose={() => setEditingUser(null)} />}
        </>
    );
};

export default Dashboard;
