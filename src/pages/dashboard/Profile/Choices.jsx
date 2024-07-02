import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateChoices, getAccountSetupData } from '../../../services/api.service';
import { updateFormData } from '../../../store/accountSlice';
import { toast } from 'react-toastify';

const Choices = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const accountSetupValues = useSelector((state) => state.account);
    const [isEditing, setIsEditing] = useState(false);
    const [choices, setChoices] = useState(accountSetupValues);

    const { refetch } = useQuery({
        queryKey: ['accountSetupData'],
        queryFn: getAccountSetupData,
        onSuccess: (data) => {
            dispatch(updateFormData(data.data));
            setChoices(data.data);
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });

    useEffect(() => {
        if (Object.keys(accountSetupValues).length === 0) {
            refetch();
        }
    }, [accountSetupValues, refetch]);

    useEffect(() => {
        if (location.state?.isEditing) {
            setIsEditing(true);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    const updateMutation = useMutation({
        mutationFn: updateChoices,
        onSuccess: (data) => {
            toast.success('Data saved successfully');
            setIsEditing(false);
            dispatch(updateFormData(data));
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });

    const handleEdit = () => {
        setIsEditing(true);
        navigate('/accountsetup', { state: { isEditing: true, previousRoute: '/dashboard/settings' } });
    };

    const handleSave = () => {
        updateMutation.mutate(choices);
    };

    const handleCancel = () => {
        refetch();
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChoices((prevChoices) => ({
            ...prevChoices,
            [name]: value,
        }));
    };

    return (
        <div className="rounded-xl">
            <div className="relative">
                {!isEditing && (
                    <button
                        onClick={handleEdit}
                        className="absolute top-0 right-0 text-primaryBlack mt-2 flex items-center gap-2 bg-primaryGreen p-2 rounded-md"
                    >
                        <img src="/img/pencil.png" alt="edit" className='h-4 w-4' />
                        <span className='font-medium'> Edit</span>
                    </button>
                )}
            </div>
            <div className="grid grid-cols-2 gap-6 px-20 pt-10">
                {[
                    { label: 'Your Brand Name', name: 'brandName' },
                    { label: 'Your Brand Slogan', name: 'slogan' },
                    { label: 'Your Service Type', name: 'designType' },
                    { label: 'Your Niche', name: 'targetNiche' },
                    { label: 'Your Font Option', name: 'selectedFonts' },
                    { label: 'Your Colour Option', name: 'selectedPalettes' },
                ].map((field) => (
                    <div key={field.name} className="mb-4 mx-5">
                        <label className="block text-sm font-medium text-white">
                            {field.label}
                        </label>
                        <input
                            type="text"
                            name={field.name}
                            value={choices[field.name] || ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full px-3 pt-2 pb-12 bg-primaryBlack ${isEditing ? 'text-white' : 'text-primarypurple'} rounded-md shadow-sm focus:outline-none`}
                        />
                    </div>
                ))}
            </div>
            {isEditing && (
                <div className="flex justify-end space-x-4">
                    <button onClick={handleCancel} className="border border-primaryGreen font-bold text-white px-12 py-2 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="bg-primaryGreen font-bold text-primaryBlack px-12 py-2 rounded">
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default Choices;
