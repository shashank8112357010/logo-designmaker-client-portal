import React, { useState } from 'react';
import ToggleSwitch from '../../../components/ToggleSwitch';

const Preferences = () => {
    const [currency, setCurrency] = useState('USD');
    const [timeZone, setTimeZone] = useState('(GMT-12:00) International Date Line West');
    const [sendOrReceiveCurrency, setSendOrReceiveCurrency] = useState(true);
    const [receiveMerchantOrder, setReceiveMerchantOrder] = useState(false);
    const [recommendations, setRecommendations] = useState(true);

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
                    isOn={sendOrReceiveCurrency}
                    handleToggle={() => setSendOrReceiveCurrency(!sendOrReceiveCurrency)}
                    label="I send or receive digital currency"
                />
                <ToggleSwitch
                    isOn={receiveMerchantOrder}
                    handleToggle={() => setReceiveMerchantOrder(!receiveMerchantOrder)}
                    label="I receive merchant order"
                />
                <ToggleSwitch
                    isOn={recommendations}
                    handleToggle={() => setRecommendations(!recommendations)}
                    label="There are recommendations for my account"
                />
            </div>
            <div className="flex justify-end">
                <button className="bg-primaryGreen font-bold text-primaryBlack px-12 py-2 rounded">Save</button>
            </div>
        </div>
    );
};

export default Preferences;
