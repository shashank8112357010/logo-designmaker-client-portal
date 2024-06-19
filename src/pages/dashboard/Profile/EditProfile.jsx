import React, { useState } from 'react';

const EditProfile = () => {
    const [profile, setProfile] = useState({
        firstName: "Charlene",
        lastName: "Reed",
        email: "charlenereed@gmail.com",
        phoneNumber: "9120286248",
        username: "username123",
        address: "San Jose, California, USA",
        Paddress: "San Jose, California, USA",
        city: "San Jose",
        postalCode: "45962",
        country: "USA"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
       <div>
         <div className='flex items-start mt-6'>
            <div className="flex items-center mb-8 w-1/5 relative">
                <img src="/img/profile.jpg" alt="Profile" className="h-32 w-32 mt-8 ml-2 rounded-full" />
                <button className="ml-4 bg-primaryGreen text-primaryBlack py-2 px-2 rounded-full absolute left-24 top-28">
                    <img src="/img/pencil.png" alt="edit" />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-6 w-4/5">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">Phone number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">Permanent Address</label>
                    <input
                        type="text"
                        name="Paddress"
                        value={profile.Paddress}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">City</label>
                    <input
                        type="text"
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={profile.postalCode}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={profile.country}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-primaryBlack text-primarypurple rounded-md shadow-sm focus:outline-none"
                    />
                </div>
            </div>
        </div>
        <div className="flex justify-end">
            <button className="bg-primaryGreen font-bold text-primaryBlack px-12 py-2 rounded">Save</button>
        </div>
       </div>
    );
};

export default EditProfile;
