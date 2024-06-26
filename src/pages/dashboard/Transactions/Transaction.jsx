import React, { useState } from 'react';
import Request from './Request';
const Transaction = () => {
    const [activeTab, setActiveTab] = useState('All Transaction');
    const [showRefundModal, setShowRefundModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const handleTabClick = (tab) => setActiveTab(tab);
    const handleRefundClick = (service) => {
        setSelectedService(service);
        setShowRefundModal(true);
    };
    const handleModalClose = () => setShowRefundModal(false);
    const handleRefundSubmit = (data) => {
        console.log('Refund Data:', data);
    };

    const tabClasses = (tab) => (
        ` font-medium pb-2 cursor-pointer ${activeTab === tab ? 'text-primaryGreen' : 'text-primarypurple'}`
    );

    const transactions = [
        { service: "Logo design", status: "Success", date: "28 Jan, 12:30 AM", amount: "$300", refund: "Request" },
        { service: "Magazine design", status: "Pending", date: "25 Jan, 10:40 PM", amount: "$200", refund: "Request" },
        { service: "Logo design", status: "Failed", date: "20 Jan, 10:40 PM", amount: "$150", refund: "Request" },
        { service: "Magazine design", status: "Pending", date: "15 Jan, 03:29 PM", amount: "$200", refund: "Request" },
        { service: "Magazine design", status: "Pending", date: "14 Jan, 10:40 PM", amount: "$150", refund: "Request" }
    ];

    const filteredTransactions = transactions.filter(transaction => {
        if (activeTab === 'Success') return transaction.status === 'Success';
        if (activeTab === 'Refunded') return transaction.status === 'Refunded';
        return true;
    });

    const getStatusClass = (status) => {
        switch (status) {
            case 'Success':
                return 'text-green-500 border border-green-500';
            case 'Pending':
                return 'text-orange-500 border border-orange-500 ';
            case 'Failed':
                return 'text-red-500 border border-red-500';
            default:
                return '';
        }
    };

    return (
        <div className="py-6 px-10 bg-primaryBlack text-white">
            <h2 className="text-2xl font-semibold mb-4">Your Transactions</h2>
            <div className="mb-4">
                <div className="flex  gap-16 relative">
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
                <div className="absolute bottom-0 left-0 h-[3px] bg-primaryGreen rounded-lg" style={{ width: `120px`, transform: `translateX(${activeTab === 'All Transaction' ? 0 : activeTab === 'Success' ? 140 : 265}px)` }} />
                    {['All Transaction', 'Success', 'Refunded'].map(tab => (
                        <button
                            key={tab}
                            className={tabClasses(tab)}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-secondaryBlack p-4 rounded-2xl mt-6">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-primarypurple">
                            <th className="pb-2 px-4 text-left">Service</th>
                            <th className="pb-2 text-center">Status</th>
                            <th className="pb-2 text-center">Date</th>
                            <th className="pb-2 text-center">Amount</th>
                            <th className="pb-2 text-center">Refund</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction, index) => (
                            <tr key={index} className="border-t border-white">
                                <td className="py-3 px-4">{transaction.service}</td>
                                <td className='flex items-center justify-center py-3'>
                                    <div className={`w-28 py-1 px-4 text-center rounded-full ${getStatusClass(transaction.status)}`}>
                                        {transaction.status}
                                    </div>
                                </td>
                                <td className="py-3 text-center">{transaction.date}</td>
                                <td className="py-3 text-center">{transaction.amount}</td>
                                <td className="py-3 text-center">
                                    <button
                                        className="border border-primaryGreen text-primaryGreen px-4 py-1 rounded-full"
                                        onClick={() => handleRefundClick(transaction.service)}
                                    >
                                        {transaction.refund}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Request
                isVisible={showRefundModal}
                onClose={handleModalClose}
                onSubmit={handleRefundSubmit}
                serviceType={selectedService}
            />
        </div>
    );
};

export default Transaction;
