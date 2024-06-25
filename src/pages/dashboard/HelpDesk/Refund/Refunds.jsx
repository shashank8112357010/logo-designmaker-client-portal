import React, { useState } from 'react';

const Refunds = () => {
    const refundData = [
        { service: "Logo design", transactionId: "Transaction#12334", date: "28 Jan ", time:", 12:30 AM", amount: "$300", status: "View", requestStatus: "raised" },
        { service: "Magazine design", transactionId: "Transaction#12334", date: "28 Jan ", time:", 12:30 AM", amount: "$300", status: "View", requestStatus: "closed" },
        { service: "Logo design", transactionId: "Transaction#12334", date: "28 Jan ", time:", 12:30 AM", amount: "$300", status: "View", requestStatus: "raised" },
        { service: "Magazine design", transactionId: "Transaction#12334", date: "28 Jan ", time:", 12:30 AM", amount: "$300", status: "View", requestStatus: "closed" },
        { service: "Magazine design", transactionId: "Transaction#12334", date: "28 Jan ", time:", 12:30 AM", amount: "$300", status: "View", requestStatus: "raised" },
    ];

    const [selectedRefund, setSelectedRefund] = useState(null);

    const handleViewClick = (refund) => {
        setSelectedRefund(refund);
    };

    const handleCloseModal = () => {
        setSelectedRefund(null);
    };

    return (
        <div className="py-6 px-10 bg-primaryBlack text-white min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Your Refunds</h2>
            <div className="bg-secondaryBlack p-4 rounded-2xl mt-6">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-primarypurple">
                            <th className="pb-2 text-left">Service</th>
                            <th className="pb-2 text-left">Transaction Id</th>
                            <th className="pb-2 text-center">Date</th>
                            <th className="pb-2 text-center">Amount</th>
                            <th className="pb-2 text-end pr-8">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {refundData.map((refund, index) => (
                            <tr key={index} className="border-t border-white">
                                <td className="py-4">{refund.service}</td>
                                <td className="py-4">{refund.transactionId}</td>
                                <td className="py-4 text-center">{refund.date}{refund.time}</td>
                                <td className="py-4 text-center text-primaryGreen">{refund.amount}</td>
                                <td className="py-4 text-end">
                                    <button
                                        className="border border-primaryGreen text-primaryGreen px-8 py-1 rounded-full"
                                        onClick={() => handleViewClick(refund)}
                                    >
                                        {refund.status}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedRefund && (
                <div className="fixed inset-0 left-[16.7%] top-24 flex items-center justify-center z-10">
                    <div className="absolute inset-0 bg-customGray bg-opacity-50"></div>
                    <div className="bg-secondaryBlack p-6 relative rounded-lg w-[45%] z-20">
                        <button onClick={handleCloseModal} className="text-primaryGreen text-lg font-semibold">
                            <img src="/img/Cross.png" alt="Close" className='w-5 h-5 cursor-pointer m-2 absolute top-0 right-0' />
                        </button>
                        <div className="text-lg text-white flex justify-center">
                            {selectedRefund.requestStatus === "raised" ? (
                                <div className="flex items-center flex-col justify-center">
                                    <img src="/img/i-circle.png" alt="info" />
                                    <span className='mt-6 mb-6'>Your Refund Request has been Raised</span>
                                </div>
                            ) : (
                                <div className="flex items-center flex-col justify-centerr">
                                    <img src="/img/tick-circle.png" alt="check"  />
                                    <span className='mt-6 mb-6'>Your Refund Request has been Closed Successfully</span>
                                </div>
                            )}
                        </div>

                        <div className='flex justify-between'>
                        <div className="mt-4 text-white flex flex-col gap-4">
                            <p className='flex gap-1'>Service: <span className='text-customGray'>{selectedRefund.service}</span></p>
                            <p className='flex gap-1'>Request Date: <span className='text-customGray'> {selectedRefund.date}</span></p>
                        </div>
                        <div className="mt-4 text-white flex flex-col  gap-4">
                           
                            <p className='flex gap-1'>Transaction Id: <span className='text-customGray'>{selectedRefund.transactionId}</span></p>
                            <p className='flex gap-1'>Amount: <span className='text-customGray'> {selectedRefund.amount}</span></p>
                        </div>
                        </div>
                        <div className="mt-10 text-white text-center">
                            Any Issue? <a href="cc" className="text-primaryGreen">Report</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Refunds;