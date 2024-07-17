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
        <div className="mx-10 my-6 bg-secondaryBlack rounded-3xl ">
            <h2 className="text-white text-4xl pt-8  pb-6 font-semibold  text-center">Schedule Meeting</h2>
            <div className='bg-white h-[1px]  w-full'></div>
            <form className="bg-secondaryBlack pt-12 pb-8 px-28 rounded-lg">
                <div className="mb-4 flex gap-10 items-center">
                    <label className="block text-white w-1/3">Your Name *</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 h-16 bg-primaryBlack text-white rounded"
                        placeholder="Pre defined name will display"
                    />
                </div>
                <div className="mb-4 flex gap-10 items-center">
                    <label className="block text-white w-1/3">Topic of meeting *</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-2 h-16 bg-primaryBlack text-white rounded"
                        placeholder="This can be entered manually by user"
                    />
                </div>
                <div className="mb-4 flex gap-10 items-center">
                    <label className="block text-white w-1/3">Selected Service *</label>
                    <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full h-16 p-2 bg-primaryBlack text-white rounded"
                    >
                        <option>Pre selected service will be displayed</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="mb-10 flex items-center">
                    <label className="block text-white w-[28%]">Date and Time *</label>
                    <div className='flex space-x-4'>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 h-12 bg-primaryBlack text-white rounded"
                        />
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full p-2 h-12 bg-primaryBlack text-white rounded"
                        />
                    </div>

                </div>
                <div className="flex justify-center items-center " >
                    <div className="flex gap-8 w-1/2">
                        <button
                            type="button"
                            className="w-full border-2 border-primaryGreen text-white py-2 rounded-md"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="w-full bg-primaryGreen text-primaryBlack font-medium py-2 rounded-md"
                            onClick={handleSchedule}
                        >
                            Schedule
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ScheduleMeeting;
