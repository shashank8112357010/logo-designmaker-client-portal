import React, { useState } from 'react';
import ToggleSwitch from '../../../components/ToggleSwitch';

const Security = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return (
        <div className="mt-6 bg-secondaryBlack p-6 rounded-xl">
            <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">Two-factor Authentication</label>
                <ToggleSwitch
                    isOn={twoFactorEnabled}
                    handleToggle={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    label="Enable or disable two-factor authentication"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-white">Change Password</label>
                <div className="mt-2">
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1  w-1/2 px-3 py-2 bg-secondaryBlack text-stone-200 rounded-xl shadow-sm border border-stone-200"
                    />
                </div>
                <div className="mt-2">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1  w-1/2 px-3 py-2 bg-secondaryBlack text-stone-200 rounded-xl shadow-sm border border-stone-200"
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
