import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

const ScheduleMeeting = ({ onCancel }) => {
    const [name, setName] = useState('');
    const [topic, setTopic] = useState('');
    const [service, setService] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [time, setTime] = useState({ hour: 12, minute: 0, second: 0, period: 'AM' });
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (field, value) => {
        setTime((prevTime) => ({ ...prevTime, [field]: value }));
    };

    const handleScroll = (field, direction) => {
        setTime((prevTime) => {
            const maxValues = { hour: 12, minute: 59, second: 59 };
            const minValue = 0;
            const newValue = prevTime[field] + direction;
            const adjustedValue = newValue > maxValues[field] ? minValue : newValue < minValue ? maxValues[field] : newValue;
            return { ...prevTime, [field]: adjustedValue };
        });
    };

    const handleSchedule = () => {
        // Handle the scheduling logic here
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const toggleTimePicker = () => {
        setIsTimePickerOpen(!isTimePickerOpen);
    };

    const handleSaveDate = () => {
        setIsCalendarOpen(false);
    };

    const handleCancelDate = () => {
        setSelectedDate(null);
        setIsCalendarOpen(false);
    };

    const handleSaveTime = () => {
        setIsTimePickerOpen(false);
    };

    const handleCancelTime = () => {
        setTime({ hour: 12, minute: 0, second: 0, period: 'AM' });
        setIsTimePickerOpen(false);
    };

    const renderScrollPicker = (field, maxValue) => (
        <div className="relative w-16 bg-primaryBlack text-white text-center rounded h-24 flex flex-col items-center justify-center overflow-hidden">
            <div
                className="absolute top-0 w-full h-8 flex-col items-center justify-center"
                style={{ transform: `translateY(${-(time[field] * 100 / maxValue)}%)` }}
                onWheel={(e) => handleScroll(field, e.deltaY > 0 ? 1 : -1)}
            >
                <div className="text-sm opacity-50">{(time[field] - 1 + maxValue + 1) % (maxValue + 1)}</div>
                <div className="text-lg">{time[field]}</div>
                <div className="text-sm opacity-50">{(time[field] + 1) % (maxValue + 1)}</div>
            </div>
        </div>
    );

    return (
        <div className="mx-10 my-6 bg-secondaryBlack rounded-3xl">
            <h2 className="text-white text-4xl pt-8 pb-6 font-semibold text-center">Schedule Meeting</h2>
            <div className='bg-white h-[1px] w-full'></div>
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
                    <div className='flex flex-col space-y-4'>
                        <input
                            type="text"
                            value={selectedDate ? format(selectedDate, 'PPP') : ''}
                            onFocus={toggleCalendar}
                            readOnly
                            className="w-full p-2 h-12 bg-primaryBlack text-white rounded cursor-pointer"
                            placeholder="Select a date"
                        />
                        {isCalendarOpen && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="absolute inset-0 bg-white bg-opacity-50"></div>
                                <div className="relative bg-primaryBlack p-4 rounded-lg z-10">
                                    <DayPicker
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={handleDateChange}
                                        className="text-white"
                                        style={{ '--rdp-cell-size': '2.5em' }}
                                    />
                                    <div className="flex justify-between mt-4">
                                        <button
                                            type="button"
                                            className="border border-primaryGreen text-white px-4 py-2 rounded"
                                            onClick={handleCancelDate}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-primaryGreen text-primaryBlack px-4 py-2 rounded"
                                            onClick={handleSaveDate}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <input
                            type="text"
                            value={`${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}:${String(time.second).padStart(2, '0')} ${time.period}`}
                            onFocus={toggleTimePicker}
                            readOnly
                            className="w-full p-2 h-12 bg-primaryBlack text-white rounded cursor-pointer"
                            placeholder="Select a time"
                        />
                        {isTimePickerOpen && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="absolute inset-0 bg-white bg-opacity-50"></div>
                                <div className="relative bg-primaryBlack p-4 rounded-lg z-10">
                                    {/* Custom Scrollable Time Picker Component */}
                                    <div className="flex flex-col items-center">
                                        <div className="flex space-x-2">
                                            {renderScrollPicker('hour', 11)}
                                            <span className="text-white">:</span>
                                            {renderScrollPicker('minute', 59)}
                                            <span className="text-white">:</span>
                                            {renderScrollPicker('second', 59)}
                                            <select
                                                value={time.period}
                                                onChange={(e) => handleTimeChange('period', e.target.value)}
                                                className="w-16 bg-primaryBlack text-white text-center rounded h-24 overflow-y-scroll"
                                            >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <button
                                                type="button"
                                                className="border border-primaryGreen text-white px-4 py-2 rounded"
                                                onClick={handleCancelTime}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-primaryGreen text-primaryBlack px-4 py-2 rounded"
                                                onClick={handleSaveTime}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center">
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
