import React, { useState } from 'react';

type User = {
    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
};

type UserEditProps = {
    user: User;
    onSave: (userId: number, updatedUser: User) => void;
    onClose: () => void;
};

const UserEditForm: React.FC<UserEditProps> = ({ user, onSave, onClose }) => {
    const [editedUser, setEditedUser] = useState<User>({ ...user });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(user.id, editedUser);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Edit User</h3>
                <form onSubmit={handleSubmit} className="mt-5">
                    <label className="block">
                        <span className="text-gray-700">Username:</span>
                        <input
                            type="text"
                            name="username"
                            value={editedUser.username}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                        />
                    </label>
                    <label className="block mt-4">
                        <span className="text-gray-700">Admin:</span>
                        <input
                            type="checkbox"
                            name="isAdmin"
                            checked={editedUser.isAdmin}
                            onChange={handleChange}
                            className="mt-1 block"
                        />
                    </label>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Save
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEditForm;
