import React, { useState } from 'react';

const recentlyAdded = [
    {
        title: "Logo design",
        image: "/img/Elot.png",
        date: "Added 1 day ago"
    },
    {
        title: "Social media design",
        image: "/img/Elot.png",
        date: "Added 1 day ago"
    },
    {
        title: "Logo design",
        image: "/img/Elot.png",
        date: "Added 1 day ago"
    },
    {
        title: "Social media design",
        image: "/img/Elot.png",
        date: "Added 1 day ago"
    }
];

const files = [
    {
        service: "Logo design",
        format: "PNG,SVG,PSD",
        uploadDate: "28 Jan, 12:30 AM"
    },
    {
        service: "Magazine design",
        format: "PNG,SVG,PSD",
        uploadDate: "25 Jan, 10:40 PM"
    },
    {
        service: "Logo design",
        format: "PNG,SVG,PSD",
        uploadDate: "20 Jan, 10:40 PM"
    },
    {
        service: "Magazine design",
        format: "PNG,SVG,PSD",
        uploadDate: "15 Jan, 03:29 PM"
    },
    {
        service: "Magazine design",
        format: "PNG,SVG,PSD",
        uploadDate: "14 Jan, 10:40 PM"
    }
];

const Files = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        service: '',
        format: '',
        uploadDate: ''
    });

    const handleDownloadClick = (file) => {
        setFormData(file);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div className="pt-12 px-8">
            <h2 className="text-white text-2xl font-medium mb-4">Recently added</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mx-4 w-[90%]">
                {recentlyAdded.map((item, index) => (
                    <div key={index} className="bg-secondaryBlack p-2 rounded-lg text-white">
                        <img src={item.image} alt={item.title} className="h-40 w-full object-cover mb-2 rounded-lg" />
                        <h3 className="text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-customGray">{item.date}</p>
                    </div>
                ))}
            </div>
            <h2 className="text-white text-2xl font-medium mb-4">All Files</h2>
            <div className="bg-secondaryBlack py-4 px-4 rounded-2xl">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-primarypurple">
                            <th className="py-2 text-left">Service</th>
                            <th className="py-2">Format</th>
                            <th className="py-2 pr-4 text-end">Upload Date</th>
                            <th className="py-2 pr-6 text-end">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={index} className="text-white border-t border-stone-200">
                                <td className="py-4">{file.service}</td>
                                <td className="py-4 text-center">{file.format}</td>
                                <td className="py-4 text-end">{file.uploadDate}</td>
                                <td className="py-4 pr-2 text-end">
                                    <button
                                        className="bg-primaryGreen font-medium text-primaryBlack text-end px-4 py-2 rounded-full"
                                        onClick={() => handleDownloadClick(file)}
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end items-center gap-4 mt-8 mb-2">
                <button className="text-customGray">Previous</button>
                <div className="flex space-x-2">
                    <button className="bg-primaryGreen text-primaryBlack px-4 py-1 rounded">1</button>
                    <button className="bg-primaryBlack border border-white text-white px-4 py-1 rounded">2</button>
                </div>
                <button className="text-customGray">Next</button>
            </div>

            {showForm && (
                <div className="fixed inset-0 left-[16.7%] top-24 flex items-center justify-center z-10">
                    <div className="absolute inset-0 bg-customGray bg-opacity-10 h-full"></div>
                    <div className="bg-secondaryBlack  rounded w-[50%] z-20 h-[310px]">
                        <div className='flex justify-between'>
                            <img src='/img/Elot.png' alt='elot' className='w-1/2 h-[310px] p-3' />
                            <div className='flex flex-col items-end'>
                                <img
                                    src="/img/Cross.png"
                                    alt="Close"
                                    className='w-5 h-5 cursor-pointer m-2'
                                    onClick={handleCloseForm}
                                />
                                <div className='mt-4 mr-20'>
                                    <h4 className='text-white'>Service : <span className='text-customGray'>{formData.service}</span></h4>
                                    <h4 className='text-white'> Format : <span className='text-customGray'>{formData.format}</span></h4>
                                    <h4 className='text-white'> Upload Date : <span className='text-customGray'>{formData.uploadDate}</span></h4>
                                    <h4 className='text-white mt-10'>Any Issue? <span className='text-primaryGreen cursor-pointer'>Report Content</span></h4>
                                    <button className='bg-primaryGreen text-primaryBlack py-2 px-6 mt-10 rounded font-medium'>Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Files;
