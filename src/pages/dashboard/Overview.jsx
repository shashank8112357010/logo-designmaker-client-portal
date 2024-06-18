import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';

const Overview = () => {
    const [date, setDate] = useState(new Date());
    const [selectedTab, setSelectedTab] = useState('All Meets');

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };

    const renderTableContent = () => {
        switch (selectedTab) {
            case 'Scheduled':
                return (
                    <tbody>
                        <tr className='border-t border-white text-white'>
                            <td className="py-4">Service number 2</td>
                            <td className="py-4">Scheduled design</td>
                            <td className="py-4">30 Jan, 11.00 AM</td>
                            <td className="py-4 text-red-600">1 Hr</td>
                            <td className="py-4"><button className="border border-primaryGreen text-white rounded-full px-2 py-1 ">See Files</button></td>
                        </tr>
                    </tbody>
                );
            case 'Cancelled':
                return (
                    <tbody>
                        <tr className='border-t border-white text-white'>
                            <td className="py-4">Service number 3</td>
                            <td className="py-4">Cancelled design</td>
                            <td className="py-4">5 Feb, 2.00 PM</td>
                            <td className="py-4 text-red-600">1 Hr</td>
                            <td className="py-4"><button className="border border-primaryGreen text-white rounded-full px-2 py-1 ">See Files</button></td>
                        </tr>
                    </tbody>
                );
            case 'All Meets':
            default:
                return (
                    <tbody>
                        <tr className='border-t border-white text-white'>
                            <td className="py-4">Service number 1</td>
                            <td className="py-4">Logo design</td>
                            <td className="py-4">28 Jan, 12.30 AM</td>
                            <td className="py-4 text-red-600">2 Hr</td>
                            <td className="py-4"><button className="border border-primaryGreen text-white rounded-full px-2 py-1 ">See Files</button></td>
                        </tr>
                        <tr className='border-t border-white text-white'>
                            <td className="py-4">Service number 1</td>
                            <td className="py-4">Magazine design</td>
                            <td className="py-4">25 Jan, 10.40 PM</td>
                            <td className="py-4 text-red-600">2 Hr</td>
                            <td className="py-4"><button className="border border-primaryGreen text-white rounded-full px-2 py-1 ">See Files</button></td>
                        </tr>
                        <tr className='border-t border-white text-white'>
                            <td className="py-4">Service number 1</td>
                            <td className="py-4">Logo design</td>
                            <td className="py-4">20 Jan, 10.40 AM</td>
                            <td className="py-4 text-red-600">2 Hr</td>
                            <td className="py-4"><button className="border border-primaryGreen text-white rounded-full px-2 py-1 ">See Files</button></td>
                        </tr>
                        <tr className='border-t border-white text-white'>
                            <td className="py-4">Service number 1</td>
                            <td className="py-4">Magazine design</td>
                            <td className="py-4">15 Jan, 03.29 PM</td>
                            <td className="py-4 text-red-600">2 Hr</td>
                            <td className="py-4"><button className="border border-primaryGreen text-white rounded-full px-2 py-1 ">See Files</button></td>
                        </tr>
                        <tr className='border-t border-white text-white'>
                            <td className="py-4">Service number 1</td>
                            <td className="py-4">Magazine design</td>
                            <td className="py-4">14 Jan, 10.40 PM</td>
                            <td className="py-4 text-red-600">2 Hr</td>
                            <td className="py-4"><button className="border border-primaryGreen text-white rounded-full px-2 py-1 ">See Files</button></td>
                        </tr>
                    </tbody>
                );
        }
    };

    return (
        <div className="bg-primaryBlack  flex flex-col lg:flex-row relative">
            <Sidebar />
            <div className="lg:ml-[16.7%] lg:w-[83.3%]  w-full bg-primaryBlack min-h-screen flex-grow absolute border-l-2 border-secondaryBlack">
                <Header />
                <main className="ml-10 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 mr-6">
                    <section className="bg-secondaryBlack p-8 rounded-lg col-span-1 lg:col-span-2 h-fit">
                        <div className='flex flex-col lg:flex-row h-full'>
                            <div className='w-full lg:w-1/2 h-full'>
                                <h2 className="text-white text-2xl font-medium mb-4">Get your Designs At One Place</h2>
                                <p className="text-gray-400 mb-6">
                                    Logo Design Maker wasn’t born out of a boardroom meeting or a desire to replicate the status quo. It stemmed from a genuine passion for design and a frustration with the limitations of AI-generated logos.
                                </p>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                                    <button className="bg-primaryGreen text-primaryBlack px-4 py-2 font-bold rounded-lg">
                                        Schedule Meet
                                    </button>
                                    <button className="border border-primaryGreen text-white px-4 py-2 rounded-lg">
                                        Explore
                                    </button>
                                </div>
                            </div>
                            <div className='w-full lg:w-1/2 flex items-center justify-center h-full mt-8 lg:mt-0'>
                                <img src="/img/Group.png" alt="Design illustration" className="max-w-full h-auto" />
                            </div>
                        </div>
                    </section>
                    <section className="bg-secondaryBlack p-6 rounded-lg">
                        <h2 className="text-white text-xl font-semibold mb-4">Calendar</h2>
                        <div className='bg-secondaryBlack'>
                            <Calendar
                                onChange={setDate}
                                value={getFirstDayOfMonth(date)}
                                tileClassName={({ activeStartDate, date, view }) => (view === 'month' && date.getDay() === 0 ? 'text-red-600' : null)}
                            />
                        </div>
                        <button className="bg-primaryGreen text-primaryBlack px-4 py-2 mt-4 rounded w-full font-bold">
                            Schedule Your Meet
                        </button>
                    </section>
                </main>
                <section className=" px-6 -mt-8 pb-4 mr-6">
                    <h2 className="text-white text-2xl font-semibold mb-4 ml-0 lg:ml-5">Recent Activity</h2>
                    <div className=" rounded-lg ml-0 lg:ml-5 overflow-x-auto">
                        <nav className="flex gap-10 mb-4">
                            <button onClick={() => setSelectedTab('All Meets')} className={`pb-2 ${selectedTab === 'All Meets' ? 'text-primaryGreen border-b-2 border-primaryGreen' : 'text-white'}`}>All Meets</button>
                            <button onClick={() => setSelectedTab('Scheduled')} className={`pb-2 ${selectedTab === 'Scheduled' ? 'text-primaryGreen border-b-2 border-primaryGreen' : 'text-white'}`}>Scheduled</button>
                            <button onClick={() => setSelectedTab('Cancelled')} className={`pb-2 ${selectedTab === 'Cancelled' ? 'text-primaryGreen border-b-2 border-primaryGreen' : 'text-white'}`}>Cancelled</button>
                        </nav>
                        <div className='bg-secondaryBlack px-4 rounded-xl'>
                            <table className="w-full  text-gray-400 min-w-max ">
                                <thead className="text-purple text-left">
                                    <tr>
                                        {
                                            ["Description" , "Type" , "Date" , "Duration" , "Files"].map((item , index)=>{
                                                return (
                                                    <th key={index} className="py-2"><span className='text-[#718EBF] text-center'>{item}</span></th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                {renderTableContent()}
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Overview;
