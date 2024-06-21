import React, { useState } from 'react';
import ToggleSwitch from '../../../components/ToggleSwitch';

const Security = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return (
        <div className="mt-6 bg-secondaryBlack py-2 rounded-xl">
            <div className="mb-4">
                <label className="block  font-medium text-white mb-4">Two-factor Authentication</label>
                <ToggleSwitch
                    isOn={twoFactorEnabled}
                    handleToggle={() => setTwoFactorEnabled(!twoFactorEnabled)}
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
                        className="mt-2  w-[40%] px-3 py-2 bg-secondaryBlack text-stone-200 rounded-xl shadow-sm border border-stone-200"
                    />
                </div>
                <div className="mt-4">
                <label className="block text-sm  text-white">New Password</label>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-2  w-[40%] px-3 py-2 bg-secondaryBlack text-stone-200 rounded-xl shadow-sm border border-stone-200"
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <button className="bg-primaryGreen font-bold text-primaryBlack px-12 py-2 rounded">Save</button>
            </div>
        </div>
    );
};

export default Security;
