import React from 'react';

const servicesData = [
  {
    id: 1,
    service: 'Logo design',
    status: 'Completed',
    date: '28 Jan, 12:30 AM',
    duration: '2 Hr',
    statusClass: 'text-green-500',
    borderColor: 'border-green-500'
  },
  {
    id: 2,
    service: 'Magazine design',
    status: 'Pending',
    date: '25 Jan, 10:40 PM',
    duration: '2 Hr',
    statusClass: 'text-orange-500',
    borderColor: 'border-yellow-500'
  },
  {
    id: 3,
    service: 'Logo design',
    status: 'Cancelled',
    date: '20 Jan, 10:40 PM',
    duration: '2 Hr',
    statusClass: 'text-red-500',
    borderColor: 'border-red-500'
  },
  {
    id: 4,
    service: 'Magazine design',
    status: 'Pending',
    date: '15 Jan, 03:29 PM',
    duration: '2 Hr',
    statusClass: 'text-orange-500',
    borderColor: 'border-yellow-500'
  },
  {
    id: 5,
    service: 'Magazine design',
    status: 'Pending',
    date: '14 Jan, 10:40 PM',
    duration: '2 Hr',
    statusClass: 'text-orange-500',
    borderColor: 'border-yellow-500'
  }
];

const Services = () => {
  return (
    <div className="text-white mt-6 p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Services</h2>
      <div className="bg-secondaryBlack p-4 rounded-2xl">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-primarypurple">Service</th>
              <th className="text-center  py-2 text-primarypurple">Status</th>
              <th className="py-2 text-center text-primarypurple">Date</th>
              <th className="py-2 text-center text-primarypurple">Duration</th>
              <th className="py-2 text-primarypurple">Files</th>
            </tr>
          </thead>
          <tbody>
            {servicesData.map(({ id, service, status, date, duration, statusClass, borderColor }) => (
              <tr key={id} className="border-t border-primaryGray">
                <td className="px-4 py-3">{service}</td>
                <td className={`flex justify-center py-3 ${statusClass}`}>
                  <div className={`border ${borderColor} rounded-full py-1 px-4 w-28 text-center`}>{status}</div>
                </td>
                <td className="text-center py-3">{date}</td>
                <td className=" py-3 text-center text-red-500">{duration}</td>
                <td className="text-center py-3">
                  <button className="text-primaryGreen border border-primaryGreen rounded-full py-1 px-4">See Files</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
