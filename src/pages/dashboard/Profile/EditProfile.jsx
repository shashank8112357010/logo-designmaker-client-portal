import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../../services/api.service';
import { updateProfileField,setProfileImage } from '../../../store/accountSlice';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { firstName, lastName, address, city, postalCode, country, profileImg, username } = useSelector(state => state.account);
    const { workEmail, phoneNo } = useSelector(state => state.account.user || {});
    const profile = { firstName, lastName, workEmail, phoneNo, username, address, city, postalCode, country, profileImg };

    const [localProfile, setLocalProfile] = useState(profile);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(profileImg);

    const mutation = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (res) => {
            const updatedData = {
                ...res.user,
                ...res.userReq,
            };
            Object.entries(updatedData).forEach(([key, value]) => {
                dispatch(updateProfileField({ field: key, value }));
            });
            toast.success(res.message);
            setIsEditing(false);
        },
        onError: (error) => {
            toast.error(error.response.data.message);
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

    const handleSubmit = () => {
        const formData = new FormData();
        Object.entries(localProfile).forEach(([key, value]) => {
            formData.append(key, value);
        });

        mutation.mutate(formData);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setLocalProfile(profile);
        setPreviewImage(profileImg);
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
                </button>
            )}
            <div className="flex items-start mt-4">
                <div className="flex items-center mb-8 w-1/5 relative">
                    {isEditing && (
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handlePhotoChange}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                    )}
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="Profile"
                            className="rounded-full w-36 h-36 mt-8 ml-2 object-cover"
                        />
                    ) : (
                        <img
                            src="/img/profile.jpg"
                            alt="Profile"
                            className="rounded-full w-36 h-36 object-cover"
                        />
                    )}
                    {isEditing && (
                        <button className="ml-4 bg-primaryGreen text-primaryBlack py-2 px-2 rounded-full absolute left-28 top-32">
                            <img src="/img/pencil.png" alt="edit" />
                        </button>
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
                    <button onClick={handleSubmit} className="bg-primaryGreen font-bold text-primaryBlack px-12 py-2 rounded">
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
