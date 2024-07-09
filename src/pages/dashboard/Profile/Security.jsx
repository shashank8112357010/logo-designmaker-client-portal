import React, { useState } from 'react';
import ToggleSwitch from '../../../components/ToggleSwitch';
import { useMutation } from '@tanstack/react-query';
import { toggleTwoFactorAuth, updatePassword } from '../../../services/api.service';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateTwoFactor } from '../../../store/accountSlice';
import { BeatLoader } from 'react-spinners';

const Security = () => {
    const dispatch = useDispatch();
    const twoFactor = useSelector((state) => state.account.user.twoFactor);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(twoFactor);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const passwordMutation = useMutation({
        mutationFn: updatePassword,
        onSuccess: (res) => {
            toast.success(res.data.message);
            setLoading(false)
        },
       
        onError: (error) => {
            toast.error(error.response.data.message);
            setLoading(false)
        },
    });

    const twoFactorMutation = useMutation({
        mutationFn: toggleTwoFactorAuth,
        onSuccess: (res) => {
            toast.success(res.data.message);
            dispatch(updateTwoFactor(twoFactorEnabled));
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    const handleSave = () => {
        setLoading(true)
        passwordMutation.mutate({ currentPassword, newPassword });
    };

    const handleToggleTwoFactor = () => {
        const newTwoFactorState = !twoFactorEnabled;
        console.log(newTwoFactorState)
        setTwoFactorEnabled(newTwoFactorState);
        twoFactorMutation.mutate(newTwoFactorState);
    };

    return (
        <div className="mt-6 bg-secondaryBlack py-2 rounded-xl">
            <div className="mb-4">
                <label className="block font-medium text-white mb-4">Two-factor Authentication</label>
                <ToggleSwitch
                    isOn={twoFactorEnabled}
                    handleToggle={handleToggleTwoFactor}
                    label="Enable or disable two-factor authentication"
                />
            </div>
            <div className="mb-4">
                <h3 className='text-white mb-3'>Change Password</h3>
                <div className="mt-4">
                    <label className="block text-sm text-white">Current Password</label>
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-2 w-[40%] px-3 py-2 bg-secondaryBlack text-stone-200 rounded-xl shadow-sm border border-stone-200"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm text-white">New Password</label>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-2 w-[40%] px-3 py-2 bg-secondaryBlack text-stone-200 rounded-xl shadow-sm border border-stone-200"
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={handleSave} className="bg-primaryGreen font-bold text-primaryBlack px-12 py-2 rounded flex items-center justify-center">
                    {loading ? <BeatLoader size={8} color={"#000"} /> : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default Security;
