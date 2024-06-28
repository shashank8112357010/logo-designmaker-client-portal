import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../../services/api.service';
import { updateFormData,updateProfileField } from '../../../store/accountSlice';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.account);
    const [localProfile, setLocalProfile] = useState(profile);

    useEffect(() => {
        setLocalProfile(profile);
    }, [profile]);

    const mutation = useMutation( {
        mutationFn:updateUserProfile,
        onSuccess: (data) => {
            dispatch(updateFormData(data.user));
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            toast.error("Error updating user profile");
            // dispatch(resetFormData());
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        dispatch(updateProfileField({ field: name, value }));
    };

    const handleSubmit = () => {
        mutation.mutate(localProfile);
    };

    return (
        <div>
            <div className="flex items-start mt-6">
                <div className="flex items-center mb-8 w-1/5 relative">
                    <img
                        src={profile.profileImg?.url || '/img/profile.jpg'}
                        alt="Profile"
                        className="h-32 w-32 mt-8 ml-2 rounded-full"
                    />
                    <button className="ml-4 bg-primaryGreen text-primaryBlack py-2 px-2 rounded-full absolute left-24 top-28">
                        <img src="/img/pencil.png" alt="edit" />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-6 w-4/5">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={localProfile.firstName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={localProfile.lastName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={localProfile.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">Phone number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={localProfile.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={localProfile.username}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={localProfile.address}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">City</label>
                        <input
                            type="text"
                            name="city"
                            value={localProfile.city}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={localProfile.postalCode}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={localProfile.country}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={handleSubmit} className="bg-primaryGreen font-bold text-primaryBlack px-12 py-2 rounded">
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
