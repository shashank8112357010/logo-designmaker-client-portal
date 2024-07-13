import React, { useState } from 'react';
import ToggleSwitch from '../../../components/ToggleSwitch';
import { useMutation } from '@tanstack/react-query';
import { updatePreferences } from '../../../services/api.service';

import { useDispatch, useSelector } from 'react-redux';
import { updateNotification } from '../../../store/accountSlice';
import toast from 'react-hot-toast';

const Preferences = () => {
    const [currency, setCurrency] = useState('USD');
    const [timeZone, setTimeZone] = useState('(GMT-12:00) International Date Line West');
    const dispatch = useDispatch();
    const general = useSelector((state) => state.account.user.generalNotification);
    const platform = useSelector((state) => state.account.user.platformUpdates);
    const promotion= useSelector((state) => state.account.user.promotion);
    const [preferences, setPreferences] = useState({
        isGeneralNotification: general,
        isPlatformUpdates: platform,
        isPromotions: promotion,
    });

    const mutation = useMutation({
        mutationFn: updatePreferences,
        onSuccess: (res) => {
            toast.success(res.data.message);
            dispatch(updateNotification({
                generalNotification: preferences.isGeneralNotification,
                platformUpdates: preferences.isPlatformUpdates,
                promotion: preferences.isPromotions,
            }));
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    const handleNotificationChange = (type) => {
        setPreferences(prevState => ({
            ...prevState,
            [type]: !prevState[type]
        }));
        mutation.mutate({
            ...preferences,
            [type]: !preferences[type]
        });
    };

    return (
        <div className="mt-6 bg-secondaryBlack p-2 rounded-xl">
            <div className="grid grid-cols-2 gap-6">
                <div className="mb-4">
                    <label className="block  text-white">Currency</label>
                    <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="mt-1  w-full px-3 py-2 bg-secondaryBlack text-stone-200 rounded-xl shadow-sm border border-stone-200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Time Zone</label>
                    <input
                        type="text"
                        value={timeZone}
                        onChange={(e) => setTimeZone(e.target.value)}
                        className="mt-1  w-full px-3 py-2 bg-secondaryBlack text-stone-200 rounded-xl shadow-sm border border-stone-200"
                    />
                </div>
            </div>
            <div className="mt-4">
                <label className="block font-medium text-white mb-2">Notification</label>
                <ToggleSwitch
                    isOn={preferences.isGeneralNotification}
                    handleToggle={() => handleNotificationChange('isGeneralNotification')}
                    label="General Notification"
                />
                <ToggleSwitch
                    isOn={preferences.isPlatformUpdates}
                    handleToggle={() => handleNotificationChange('isPlatformUpdates')}
                    label="Platform Updates"
                />
                <ToggleSwitch
                    isOn={preferences.isPromotions}
                    handleToggle={() => handleNotificationChange('isPromotions')}
                    label="Promotion"
                />
            </div>
            {/* <div className="flex justify-end">
                <button className="bg-primaryGreen font-bold text-primaryBlack px-12 py-2 rounded">Save</button>
            </div> */}
        </div>
    );
};

export default Preferences;
