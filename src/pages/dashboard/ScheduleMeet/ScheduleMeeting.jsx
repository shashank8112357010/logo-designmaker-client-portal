import React, { useState} from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, startOfToday } from 'date-fns';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Dropdown } from '../../../components/CustomSelect';

const ScheduleMeeting = ({ onCancel }) => {
    const location = useLocation();
    const initialDate = location.state?.selectedDate || null;

    const [topic, setTopic] = useState('');
    const [service, setService] = useState('');
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [initialDateState, setInitialDateState] = useState(initialDate);
    const [time, setTime] = useState({ hour: null, minute: null, period: null });
    const [tempTime, setTempTime] = useState({ hour: 12, minute: 0, period: 'AM' });
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

    const firstName = useSelector((state) => state.account.firstName);
    const lastName = useSelector((state) => state.account.lastName);
    const designRequirements = useSelector((state) => state.account.designRequirements);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleScroll = (field, direction) => {
        setTempTime((prevTime) => {
            const maxValues = { hour: 12, minute: 59 };
            const minValue = field === 'hour' ? 1 : 0;
            const newValue = prevTime[field] + direction;
            const adjustedValue = newValue > maxValues[field] ? minValue : newValue < minValue ? maxValues[field] : newValue;
            return { ...prevTime, [field]: adjustedValue };
        });
    };

    const togglePeriod = () => {
        setTempTime((prevTime) => ({
            ...prevTime,
            period: prevTime.period === 'AM' ? 'PM' : 'AM'
        }));
    };

    const handleSchedule = () => {
        // Handle the scheduling logic here
    };

    const toggleCalendar = () => {
        if (!isCalendarOpen) {
            setInitialDateState(selectedDate);
        }
        setIsCalendarOpen(true);
    };

    const toggleTimePicker = () => {
        setTempTime(time.hour !== null ? time : { hour: 12, minute: 0, period: 'AM' });
        setIsTimePickerOpen(true);
    };

    const handleSaveDate = () => {
        setIsCalendarOpen(false);
    };

    const handleCancelDate = () => {
        setSelectedDate(initialDateState);
        setIsCalendarOpen(false);
    };

    const handleSaveTime = () => {
        setTime(tempTime);
        setIsTimePickerOpen(false);
    };

    const handleCancelTime = () => {
        setTempTime(time);
        setIsTimePickerOpen(false);
    };

    const renderTimeInput = (field, maxValue) => (
        <div className="relative flex flex-col items-center">
            <button
                type="button"
                onClick={() => handleScroll(field, -1)}
                className="text-white"
            >
                ▲
            </button>
            <div className="bg-primaryBlack text-white text-lg w-16 h-10 flex items-center justify-center rounded">
                {String(tempTime[field]).padStart(2, '0')}
            </div>
            <button
                type="button"
                onClick={() => handleScroll(field, 1)}
                className="text-white"
            >
                ▼
            </button>
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
                        value={`${firstName} ${lastName}`}
                        className="w-full px-4 h-[56px] bg-primaryBlack text-white rounded-lg"
                        placeholder="Pre defined name will display"
                        readOnly
                    />
                </div>
                <div className="mb-4 flex gap-10 items-center">
                    <label className="block text-white w-1/3">Topic of meeting *</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-4 h-[56px] bg-primaryBlack rounded-lg text-white placeholder:text-customGray"
                        placeholder="This can be entered manually by user"
                    />
                </div>
                <div className="mb-4 flex gap-10 items-center">
                    <label className="block text-white w-1/3">Selected Service *</label>
                    <Dropdown
                        options={designRequirements}
                        value={service}
                        onChange={setService}
                        placeholder="Please select one of these Services"
                        textColor="white"
                    />
                </div>
                <div className="mb-10 flex items-center gap-10 ">
                    <label className="block text-white w-[24%]">Date and Time *</label>
                    <div className='flex gap-4 w-1/3'>
                        <input
                            type="text"
                            value={selectedDate ? format(selectedDate, 'PPP') : ''}
                            onFocus={toggleCalendar}
                            readOnly
                            className="w-2/3 px-4 h-12 bg-primaryBlack text-white rounded-lg cursor-pointer placeholder:text-customGray"
                            placeholder="Select a date"
                        />
                        {isCalendarOpen && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="absolute inset-0 bg-primaryGray bg-opacity-30"></div>
                                <div className="relative bg-primaryBlack p-4 rounded-lg z-10">
                                    <DayPicker
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={handleDateChange}
                                        disabled={{ before: startOfToday() }}
                                        className="text-white"
                                        style={{ '--rdp-cell-size': '2.5em' }}
                                    />
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            type="button"
                                            className="border border-primaryGreen w-1/2 text-white px-4 py-2 rounded-lg"
                                            onClick={handleCancelDate}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-primaryGreen text-primaryBlack font-medium w-1/2 px-4 py-2 rounded-lg"
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
                            value={
                                time.hour !== null
                                    ? `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')} ${time.period}`
                                    : ''
                            }
                            onFocus={toggleTimePicker}
                            readOnly
                            className="w-2/3 px-4 h-12 bg-primaryBlack text-white rounded-lg cursor-pointer placeholder:text-customGray"
                            placeholder="Select a time"
                        />
                        {isTimePickerOpen && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="absolute inset-0 bg-primaryGray bg-opacity-30"></div>
                                <div className="relative bg-primaryBlack p-4 rounded-lg z-10">
                                    <div className="flex flex-col items-center">
                                        <h1 className='text-white text-2xl font-medium mb-8'>Set Time</h1>
                                        <div className="flex items-center space-x-2">
                                            {renderTimeInput('hour', 12)}
                                            <div className="text-white text-lg flex items-center justify-center">
                                                :
                                            </div>
                                            {renderTimeInput('minute', 59)}
                                            <div className="relative flex flex-col items-center justify-center">
                                                {tempTime.period === 'PM' ? (
                                                    <button
                                                        type="button"
                                                        onClick={togglePeriod}
                                                        className="text-white "
                                                    >
                                                        ▲
                                                    </button>
                                                ) : <div className="text-white"> </div>}
                                                <div className="bg-primaryBlack text-white text-lg w-16 h-10 flex items-center justify-center rounded">
                                                    {tempTime.period}
                                                </div>
                                                {tempTime.period === 'AM' ? (
                                                    <button
                                                        type="button"
                                                        onClick={togglePeriod}
                                                        className="text-white"
                                                    >
                                                        ▼
                                                    </button>
                                                ) : <div className="text-white"> </div>}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-8 w-full">
                                            <button
                                                type="button"
                                                className="border border-primaryGreen w-1/2 text-white px-4 py-2 rounded-lg"
                                                onClick={handleCancelTime}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-primaryGreen text-primaryBlack font-medium w-1/2 px-4 py-2 rounded-lg"
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
                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="border border-primaryGreen text-white rounded-full px-8 py-2 w-1/3 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSchedule}
                        className="bg-primaryGreen text-primaryBlack rounded-full px-8 py-2 w-1/3 font-medium"
                    >
                        Schedule
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScheduleMeeting;
