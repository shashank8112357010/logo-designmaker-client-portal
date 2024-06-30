import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateFormData } from '../../../store/accountSlice';

const Choices = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const accountSetupValues = useSelector((state) => state.account);
    const [isEditing, setIsEditing] = useState(location.state?.isEditing || false);
    const [choices, setChoices] = useState(accountSetupValues);
    const [originalChoices, setOriginalChoices] = useState(accountSetupValues);

    useEffect(() => {
        if (location.state?.isEditing) {
            setIsEditing(true);
        }
    }, [location.state]);

    useEffect(() => {
        setChoices(accountSetupValues);
        setOriginalChoices(accountSetupValues)
    }, [accountSetupValues]);

    const handleEdit = () => {
        setIsEditing(true);
        navigate('/accountsetup', { state: { isEditing: true, previousRoute: '/dashboard/settings' } });
    };

    const handleSave = () => {
        dispatch(updateFormData(choices));
        setIsEditing(false);
    };

    const handleCancel = () => {
        dispatch(updateFormData(originalChoices));
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
            <div className="relative flex">
                <button
                    onClick={handleEdit}
                    className="absolute top-0 right-0 text-white border border-primaryGreen py-0.5 px-6 rounded-md"
                >
                    Edit
                </button>
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
                            disabled
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
