import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {TrashIcon}from '@heroicons/react/24/outline';
import { getAccountSetupData, updateUserProfile } from '../../../services/api.service';
import { updateFormData } from '../../../store/accountSlice';

import { BeatLoader} from 'react-spinners';
import toast from 'react-hot-toast';

const EditProfile = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [localProfile, setLocalProfile] = useState({});
    const [previewImage, setPreviewImage] = useState('/img/profile.jpg');
    const [loading, setLoading] = useState(false);

    const { data } = useQuery({
        queryKey: ['getAccountSetupData'],
        queryFn: getAccountSetupData,
    });

    useEffect(() => {
        if (data?.user) {
            const userRequirements = data.user.userRequirements[0] || {};
            setLocalProfile({
                firstName: userRequirements.firstName,
                lastName: userRequirements.lastName,
                workEmail: data.user.workEmail,
                phoneNo: data.user.phoneNo,
                username: data.user.username,
                address: data.user.address,
                city: data.user.city,
                postalCode: data.user.postalCode,
                country: data.user.country,

            });
            setPreviewImage(data.user.profileImg?.url || '/img/profile.jpg')
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (res) => {
            const user=res.user;
            const updatedData = {  
                user,
                ...res.userReq
            };
            dispatch(updateFormData(updatedData));
            console.log(updatedData)
            
            toast.success(res.message);
            setLoading(false);
            setIsEditing(false);
        },
        onError: (error) => {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLocalProfile((prevState) => ({
                ...prevState,
                profileImg: file,
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handlePhotoEditClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = () => {
        const formData = new FormData();
        Object.entries(localProfile).forEach(([key, value]) => {
            if (key === 'postalCode' && value !== '' && value !== null) {
                formData.append(key, Number(value));
            } else if (value instanceof Array) {
                value.forEach((val, i) => formData.append(`${key}[${i}]`, val));
            } else if (value instanceof Object && !(value instanceof File)) {
                Object.entries(value).forEach(([subKey, subValue]) => {
                    formData.append(`${key}[${subKey}]`, subValue);
                });
            } else {
                formData.append(key, value === undefined ? '' : value);
            }
        });

        // Logging FormData contents for debugging
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        // console.log(formData);
        setLoading(true);
        mutation.mutate(formData);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (data?.user) {
            const userRequirements = data.user.userRequirements[0] || {};
            setLocalProfile({
                firstName: userRequirements.firstName,
                lastName: userRequirements.lastName,
                workEmail: data.user.workEmail,
                phoneNo: data.user.phoneNo,
                username: data.user.username,
                address: data.user.address,
                city: data.user.city,
                postalCode: data.user.postalCode,
                country: data.user.country,
            });
            setPreviewImage(data.user.profileImg?.url || '/img/profile.jpg');
        }
        setIsEditing(false);
    };

    const removeProfile =()=>{
        setLocalProfile((prevState) => ({
            ...prevState,
            profileImg: null,
        }));
        setPreviewImage('/img/profile.jpg');
    }
    return (
        <div className="relative">
            {!isEditing && (
                <button
                    onClick={handleEdit}
                    className="absolute top-0 right-0 text-primaryBlack flex items-center gap-2 bg-primaryGreen p-2 rounded-full"
                >
                    <img src="/img/pencil.png" alt="edit" className='h-4 w-4' />
                </button>
            )}
            <div className="flex items-start mt-4">
                <div className="mb-8 w-1/5 relative">
                    <img
                        src={previewImage}
                        alt="Profile"
                        className="rounded-full w-36 h-36 mt-8 ml-2 object-cover"
                    />
                    {isEditing && (
                        <>
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={handlePhotoChange}
                                className="hidden"
                                ref={fileInputRef}
                            />
                            <button
                                className="ml-4 bg-primaryGreen text-primaryBlack py-2 px-2 rounded-full absolute left-28 top-32"
                                onClick={handlePhotoEditClick}
                            >
                                <img src="/img/pencil.png" alt="edit" />
                            </button>
                            <button onClick={removeProfile} className='border-primaryGreen border mt-4 ml-6 font-medium text-white px-4 py-1 rounded flex gap-2 items-center'><TrashIcon className='w-5 h-5 text-red-500' />Remove</button>
                        </>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6 w-4/5 mt-10">
                    {["firstName", "lastName", "workEmail", "phoneNo", "username", "address", "city", "postalCode", "country"].map((field) => (
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
                    <button onClick={handleSubmit} className="bg-primaryGreen font-bold text-primaryBlack px-12 py-2 rounded flex items-center justify-center">
                        {loading ? <BeatLoader size={8} color={"#000"} /> : 'Save'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
