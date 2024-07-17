import { useState } from "react";

function AccountSetup1({ formData, handleNextStep }) {
    const [firstName, setFirstName] = useState(formData?.firstName);
    const [lastName, setLastName] = useState(formData?.lastName);
    const [businessName, setBusinessName] = useState(formData?.businessName);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleBusinessNameChange = (e) => {
        setBusinessName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNextStep({ firstName, lastName, businessName });
    };

    return (
       
                <div className="flex flex-col mmd:items-start justify-center mt-8 max-h-screen sm:mx-32">
                    <div>
                        <p className="text-3xl font-bold text-white">Tell us a bit about you</p>
                        <p className="text-customGray mt-2">That will help us better account setup for you</p>
                    </div>
                    <form className="mt-8 mb-2 max-w-screen-lg w-full" onSubmit={handleSubmit}>
                        <div className="mmd:flex justify-between">
                            <div className="mb-6 mmd:w-1/2">
                                <label className="text-white text-base font-medium mb-1">First name*</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    placeholder="Neilson"
                                    className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                                    required
                                />
                            </div>
                            <div className="mb-6 mmd:ml-5 mmd:w-1/2">
                                <label className="text-white text-base font-medium mb-1">Last name*</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    placeholder="wang"
                                    className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">Business name</label>
                            <input
                                type="text"
                                value={businessName}
                                required
                                onChange={handleBusinessNameChange}
                                placeholder="Venturecapitals"
                                className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                            />
                        </div>
                        <div className="flex items-center justify-start">
                            <button type="submit" className="mt-1 p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg lg:w-[15%]">Next</button>
                        </div>
                    </form>
                </div>
    );
}

export default AccountSetup1;
