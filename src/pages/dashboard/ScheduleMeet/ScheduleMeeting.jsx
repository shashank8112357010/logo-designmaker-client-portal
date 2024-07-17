import React, { useState } from 'react';

const ScheduleMeeting = ({ onCancel }) => {
    const [name, setName] = useState('');
    const [topic, setTopic] = useState('');
    const [service, setService] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSchedule = () => {
        // Add logic to handle scheduling the meeting
    };

    return (
        <div className="schedule-meeting-container">
            <h2 className="text-white text-5xl font-semibold mb-4">Schedule Meeting</h2>
            <form className="bg-secondaryBlack p-6 rounded-lg">
                <div className="mb-4">
                    <label className="block text-white">Your Name *</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 bg-primaryBlack text-white rounded"
                        placeholder="Pre defined name will display"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Topic of meeting *</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-2 bg-primaryBlack text-white rounded"
                        placeholder="This can be entered manually by user"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Selected Service *</label>
                    <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full p-2 bg-primaryBlack text-white rounded"
                    >
                        <option>Pre selected service will be displayed</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-white">Date *</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 bg-primaryBlack text-white rounded"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-white">Time *</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full p-2 bg-primaryBlack text-white rounded"
                        />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <button
                        type="button"
                        className="w-full bg-red-600 text-white py-2 rounded"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="w-full bg-primaryGreen text-primaryBlack py-2 rounded"
                        onClick={handleSchedule}
                    >
                        Schedule
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScheduleMeeting;
