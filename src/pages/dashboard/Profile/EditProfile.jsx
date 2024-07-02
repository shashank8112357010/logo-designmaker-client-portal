import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../../services/api.service';
import { updateFormData } from '../../../store/accountSlice';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.account);
    const [localProfile, setLocalProfile] = useState(profile);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setLocalProfile(profile);
    }, [profile]);

    const mutation = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (data) => {
            console.log(data);
            dispatch(updateFormData(data));
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        },
        onError: () => {
            toast.error("Error updating user profile");
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log('Submitting profile:', localProfile);
        mutation.mutate(localProfile);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setLocalProfile(profile);
        setIsEditing(false);
    };

    return (
        <div className="relative">
            {!isEditing && (
                <button
                    onClick={handleEdit}
                    className="absolute top-0 right-0 text-primaryBlack flex items-center gap-2 bg-primaryGreen p-2 rounded-full"
                >
                    <img src="/img/pencil.png" alt="edit" className='h-4 w-4' />
                    {/* <span className='font-medium'> Edit</span> */}
                </button>
            )}
            <div className="flex items-start mt-4">
                <div className="flex items-center mb-8 w-1/5 relative">
                    <img
                        src={profile.profileImg?.url || '/img/profile.jpg'}
                        alt="Profile"
                        className="h-32 w-32 mt-8 ml-2 rounded-full"
                    />
                    {isEditing && (
                        <button className="ml-4 bg-primaryGreen text-primaryBlack py-2 px-2 rounded-full absolute left-24 top-28">
                            <img src="/img/pencil.png" alt="edit" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6 w-4/5 mt-10">
                    {["firstName", "lastName", "email", "phoneNumber", "username", "address", "city", "postalCode", "country"].map((field) => (
                        <div key={field} className="mb-4">
                            <label className="block text-sm font-medium text-white">
                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={localProfile[field] || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full px-3 py-2 bg-primaryBlack rounded-md shadow-sm focus:outline-none ${isEditing ? 'text-white' : 'text-primarypurple'}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {isEditing && (
                <div className="flex justify-end space-x-4">
                    <button onClick={handleCancel} className="border border-primaryGreen font-bold text-white px-12 py-2 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="bg-primaryGreen font-bold text-primaryBlack px-12 py-2 rounded">
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditProfile;