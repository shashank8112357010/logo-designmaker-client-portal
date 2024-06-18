import React from 'react';

const Services = () => {
  return (
    <div className="text-white mt-6 p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Services</h2>
      <div className="bg-secondaryBlack p-4 rounded-2xl">
        <table className="min-w-full">
          <thead>
            <tr className="">
              <th className="px-4 py-2 text-left text-primarypurple">Service</th>
              <th className="text-left px-12  py-2   text-primarypurple">Status</th>
              <th className=" py-2 px-12  text-left text-primarypurple">Date</th>
              <th className=" py-2 text-left   text-primarypurple">Duration</th>
              <th className=" py-2   text-primarypurple">Files</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-primaryGray">
              <td className="px-4 py-4">Logo design</td>
              <td className="px-4 py-4 text-green-500"><div className='border border-green-500 rounded-full p-2 w-28 text-center'>Completed</div></td>
              <td className="px-4 py-4">28 Jan, 12:30 AM</td>
              <td className="px-4 py-4 text-red-500">2 Hr</td>
              <td className=" py-4 text-center">
              <button className="text-primaryGreen border border-primaryGreen rounded-full py-2 px-4">See Files</button>
              </td>
            </tr>
            <tr className="border-t border-primaryGray">
              <td className="px-4 py-2">Magazine design</td>
              <td className="px-4 py-2 text-yellow-500"><div className='border border-yellow-500 rounded-full p-2 w-28 text-center'>Pending</div></td>
              <td className="px-4 py-2">25 Jan, 10:40 PM</td>
              <td className="px-4 py-2 text-red-500">2 Hr</td>
              <td className="text-center py-4">
              <button className="text-primaryGreen border border-primaryGreen rounded-full py-2 px-4">See Files</button>
              </td>
            </tr>
            <tr className="border-t border-primaryGray">
              <td className="px-4 py-2">Logo design</td>
              <td className="px-4 py-2 text-red-500"><div className='border border-red-500 rounded-full p-2 w-28 text-center'>Cancelled</div></td>
              <td className="px-4 py-2">20 Jan, 10:40 PM</td>
              <td className="px-4 py-2 text-red-500">2 Hr</td>
              <td className="text-center py-4">
              <button className="text-primaryGreen border border-primaryGreen rounded-full py-2 px-4">See Files</button>
              </td>
            </tr>
            <tr className="border-t border-primaryGray">
              <td className="px-4 py-2">Magazine design</td>
              <td className="px-4 py-2 text-yellow-500"><div className='border border-yellow-500 rounded-full p-2 w-28 text-center'>Pending</div></td>
              <td className="px-4 py-2">15 Jan, 03:29 PM</td>
              <td className="px-4 py-2 text-red-500">2 Hr</td>
              <td className="text-center py-4">
              <button className="text-primaryGreen border border-primaryGreen rounded-full py-2 px-4">See Files</button>
              </td>
            </tr>
            <tr className="border-t border-primaryGray">
              <td className="px-4 py-2">Magazine design</td>
              <td className="px-4 py-2 text-yellow-500"><div className='border border-yellow-500 rounded-full p-2 w-28 text-center'>Pending</div></td>
              <td className="px-4 py-2">14 Jan, 10:40 PM</td>
              <td className="px-4 py-2 text-red-500">2 Hr</td>
              <td className="text-center py-4">
                <button className="text-primaryGreen border border-primaryGreen rounded-full py-2 px-4">See Files</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
