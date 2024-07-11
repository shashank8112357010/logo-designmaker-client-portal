import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateChoices, getAccountSetupData } from '../../../services/api.service';
import { setupFields, updateFormData } from '../../../store/accountSlice';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';

const Choices = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const accountSetupValues = useSelector((state) => state.account);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const initialChoices = {
        brandName: accountSetupValues.brandName || '',
        slogan: accountSetupValues.slogan || '',
        designRequirements: accountSetupValues.designRequirements || [],
        niche: accountSetupValues.niche || [],
        fontOptions: accountSetupValues.fontOptions || [],
        colorOptions: accountSetupValues.colorOptions || []
    };

    const [choices, setChoices] = useState(initialChoices);

    const { data} = useQuery({
        queryKey: ['accountSetupData'],
        queryFn: getAccountSetupData,
    });

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
            dispatch(updateFormData(data.userReq));
            setLoading(false)
        },
        onError: (error) => {
            setLoading(false)
            toast.error(error.response?.data?.message || 'Failed to update data');
        }
    });

    const handleEdit = () => {
        setIsEditing(true);
        navigate('/accountsetup', { state: { isEditing: true, previousRoute: '/dashboard/settings' } });
    };

    const handleSave = () => {
        setLoading(true)
        updateMutation.mutate(choices);
    };

    const handleCancel = () => {
        if (data?.user) {
                    const userRequirements = data.user.userRequirements[0];
                    setChoices({
                        brandName: userRequirements.brandName || '',
                        slogan: userRequirements.slogan || '',
                        designRequirements: userRequirements.designRequirements || [],
                        niche: userRequirements.niche || [],
                        fontOptions: userRequirements.fontOptions || [],
                        colorOptions: userRequirements.colorOptions || [],
                    });
                    dispatch(setupFields({
                        firstName: userRequirements.firstName || '',
                        lastName: userRequirements.lastName || '',
                        businessName: userRequirements.businessName || '',
                        brandName: userRequirements.brandName || '',
                        slogan: userRequirements.slogan || '',
                        designRequirements: userRequirements.designRequirements || [],
                        niche: userRequirements.niche || [],
                        other:userRequirements.other || '',
                        fontOptions: userRequirements.fontOptions || [],
                        colorOptions: userRequirements.colorOptions || [],
                    }))
                }
                
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
                        className="absolute top-0 right-0 text-primaryBlack mt-2 flex items-center gap-2 bg-primaryGreen p-2 rounded-full"
                    >
                        <img src="/img/pencil.png" alt="edit" className='h-4 w-4' />
                    </button>
                )}
            </div>
            <div className="grid grid-cols-2 gap-6 px-20 pt-10">
                {[
                    { label: 'Your Brand Name', name: 'brandName' },
                    { label: 'Your Brand Slogan', name: 'slogan' },
                    { label: 'Your Service Type', name: 'designRequirements' },
                    { label: 'Your Niche', name: 'niche' },
                    { label: 'Your Font Option', name: 'fontOptions' },
                    { label: 'Your Colour Option', name: 'colorOptions' },
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
                    <button onClick={handleSave} className="bg-primaryGreen font-bold text-primaryBlack px-12 py-2 rounded flex items-center justify-center">
                    {loading ? <BeatLoader size={8} color={"#000"} /> : 'Save'}
                </button>
                </div>
            )}
        </div>
    );
};

export default Choices;
