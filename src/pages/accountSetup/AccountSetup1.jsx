import { useState } from "react";
import LeftSide from "../../components/LeftSide";
import { DotGroup } from "../../components/Dot";
import { useNavigate } from "react-router-dom";

function AccountSetup1() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const navigate = useNavigate();

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
        navigate("/accountsetup2");
    };

    return (
        <section className="relative bg-secondaryBlack min-h-screen flex">
            <LeftSide />
            <div className="md:left-1/3 w-full md:w-2/3 p-10 relative overflow-hidden">
                <div className="hidden fixed top-1 left-1/3 ml-5 md:flex flex-col space-y-2">
                    <DotGroup />
                </div>
                <div className="hidden fixed top-1 left-1/3 ml-1.5 md:flex flex-col space-y-2">
                    <DotGroup />
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="text-white text-2xl font-bold">Account set up</h3>
                    <p className="font-bold text-primaryGreen mt-1 mr-2 text-2xl">1/5</p>
                </div>
                <div className="w-full bg-white h-2 mt-4 rounded-lg">
                    <div className="bg-primaryGreen h-2 rounded-lg" style={{ width: '20%' }}></div>
                </div>
                <div className="flex flex-col items-start justify-center mt-12 max-h-screen mx-32">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">Tell us a bit about you</p>
                        <p></p>
                    </div>
                    <form className="md:mt-8 mb-2 w-auto max-w-screen-lg md:w-full" onSubmit={handleSubmit}>
                        <div className="flex justify-between">
                            <div className="mb-6 w-1/2">
                                <label className="text-white text-base font-medium mb-1">First name*</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    placeholder="Neilson"
                                    className="w-full p-3 bg-primaryBlack border-none text-gray-600 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-6 ml-5 w-1/2">
                                <label className="text-white text-base font-medium mb-1">Last name*</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    placeholder="wang"
                                    className="w-full p-3 bg-primaryBlack border-none text-gray-600 rounded-lg"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">Business name</label>
                            <input
                                type="text"
                                value={businessName}
                                onChange={handleBusinessNameChange}
                                placeholder="Venturecapitals"
                                className="w-full p-3 bg-primaryBlack border-none text-gray-600 rounded-lg"
                            />
                        </div>
                        <div className="flex items-center justify-start">
                            <button type="submit" className="mt-1 p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg lg:w-[15%]">Next</button>
                            <button type="button" className="mt-1 p-3 text-gray-400 font-medium mx-10">Skip</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AccountSetup1;
