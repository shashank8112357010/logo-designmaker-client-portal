import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '../../../services/api.service';
import FirstDesign from '../../../components/FirstDesign';

const statusStyles = {
    Completed: {
        statusClass: 'text-green-500',
        borderColor: 'border-green-500'
    },
    Pending: {
        statusClass: 'text-orange-500',
        borderColor: 'border-orange-500'
    },
    Cancelled: {
        statusClass: 'text-red-500',
        borderColor: 'border-red-500'
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const Services = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: getServices
    });

    console.log(data);

    if (!data || data.length === 0) {
      return <div className='mt-20'><FirstDesign /></div>;
    }

    return (
        <div className="text-white mt-6 p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Services</h2>
            <div className="bg-secondaryBlack p-4 rounded-2xl">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-primarypurple">Service</th>
                            <th className="text-center py-2 text-primarypurple">Status</th>
                            <th className="py-2 text-center text-primarypurple">Date</th>
                            <th className="py-2 text-center text-primarypurple">Duration</th>
                            <th className="py-2 text-primarypurple">Files</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(({ _id, service, status, date, time, duration, files }) => {
                            const { statusClass, borderColor } = statusStyles[status] || {};
                            return (
                                <tr key={_id} className="border-t border-primaryGray">
                                    <td className="px-4 py-3">{service}</td>
                                    <td className={`flex justify-center py-3 ${statusClass}`}>
                                        <div className={`border ${borderColor} rounded-full py-1 px-4 w-28 text-center`}>{status}</div>
                                    </td>
                                    <td className="text-center py-3">{formatDate(date)} , {time}</td>
                                    <td className="py-3 text-center text-red-500">{duration}</td>
                                    <td className="text-center py-3">
                                        <button className="text-primaryGreen border border-primaryGreen rounded-full py-1 px-4">See Files</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Services;
