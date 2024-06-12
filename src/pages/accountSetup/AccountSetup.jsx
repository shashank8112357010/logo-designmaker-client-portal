import React, { useState } from 'react';
import AccountSetupStep1 from './AccountSetup1';
import AccountSetupStep2 from './AccountSetup2';
import AccountSetupStep3 from './AccountSetup3';
import AccountSetupStep4 from './AccountSetup4';
import AccountSetupStep5 from './AccountSetup5';

import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/accountSlice';

function AccountSetup() {
    const [step, setStep] = useState(1);
    const formData = useSelector((state) => state.account);
    const dispatch = useDispatch();

    const handleNextStep = (newData) => {
        console.log('Updating formData with:', newData);
        dispatch(updateFormData(newData));
        setStep(prevStep => prevStep + 1);
        console.log('Updated formData:', formData);
    };

    const handlePreviousStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    return (
        <div>
            {step === 1 && <AccountSetupStep1 formData={formData} handleNextStep={handleNextStep} />}
            {step === 2 && <AccountSetupStep2 formData={formData} handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />}
            {step === 3 && <AccountSetupStep3 formData={formData} handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />}
            {step === 4 && <AccountSetupStep4 formData={formData} handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />}
            {step === 5 && <AccountSetupStep5 formData={formData} handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />}
        </div>
    );
}

export default AccountSetup;
