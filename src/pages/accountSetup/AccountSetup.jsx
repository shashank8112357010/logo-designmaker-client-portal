import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountSetupStep1 from './AccountSetup1';
import AccountSetupStep2 from './AccountSetup2';
import AccountSetupStep3 from './AccountSetup3';
import AccountSetupStep4 from './AccountSetup4';
import AccountSetupStep5 from './AccountSetup5';
import { updateFormData } from '../../store/accountSlice';
import { accountSetup } from '../../services/api.service';
import AccountSetupLayout from './Layout';

function AccountSetup() {
    const location = useLocation();
    const isEditing = location.state?.isEditing || false;
    const previousRoute = location.state?.previousRoute || '/dashboard/overview';
    const [step, setStep] = useState(location.state?.isEditing ? 2 : 1);
    const formData = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: accountSetup,
        onSuccess: (res) => {
            dispatch(updateFormData({ user: res.data.user, ...res.data }));
            toast.success(res.data.message);
            if (location.state?.isEditing) {
                navigate('/choices', { state: { isEditing: true } });
            } else {
                navigate('/dashboard/overview');
            }
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });

    const handleNextStep = (newData) => {
        dispatch(updateFormData({ ...formData, ...newData }));
        console.log(updateFormData(formData))
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = (updatedFormData) => {  
        dispatch(updateFormData(updatedFormData));
        if (isEditing) {
            navigate(previousRoute, { state: { isEditing: true } });
        } else {
            navigate('/dashboard/overview');
            
        }
    };

    return (
        <AccountSetupLayout stepNumber={step} handlePreviousStep={handlePreviousStep}>
            {step === 1 && <AccountSetupStep1 formData={formData} handleNextStep={handleNextStep} />}
            {step === 2 && <AccountSetupStep2 formData={formData} handleNextStep={handleNextStep} />}
            {step === 3 && <AccountSetupStep3 formData={formData} handleNextStep={handleNextStep} />}
            {step === 4 && <AccountSetupStep4 formData={formData} handleNextStep={handleNextStep} />}
            {step === 5 && <AccountSetupStep5 formData={formData} handleSubmit={handleSubmit} />}
        </AccountSetupLayout>
    );
}

export default AccountSetup;
