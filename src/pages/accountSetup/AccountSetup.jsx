import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';

import { useNavigate, useLocation } from 'react-router-dom';
import AccountSetupStep1 from './AccountSetup1';
import AccountSetupStep2 from './AccountSetup2';
import AccountSetupStep3 from './AccountSetup3';
import AccountSetupStep4 from './AccountSetup4';
import AccountSetupStep5 from './AccountSetup5';
import { setToken, updateProfileField } from '../../store/accountSlice';
import { accountSetup } from '../../services/api.service';
import AccountSetupLayout from './Layout';
import toast from 'react-hot-toast';

function AccountSetup() {
    const location = useLocation();
    const isEditing = location.state?.isEditing || false;
    const previousRoute = location.state?.previousRoute || '/dashboard/overview';
    const [step, setStep] = useState(location.state?.isEditing ? 2 : 1);

    const formData = useSelector((state) => ({
        firstName: state.account.firstName,
        lastName: state.account.lastName,
        businessName: state.account.businessName,
        brandName: state.account.brandName,
        slogan: state.account.slogan,
        designRequirements: state.account.designRequirements,
        niche: state.account.niche,
        other: state.account.other,
        fontOptions: state.account.fontOptions,
        colorOptions: state.account.colorOptions,
        user: state.account.user,
        userId: state.account.user.userId,
        token: state.account.token,
    }));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: accountSetup,

        onSuccess: (res) => {
            toast.success(res.data.message);
            const token = res.data.token;
            console.log('Setting token:', token);
            dispatch(setToken({ token }));
            navigate('/dashboard/overview');
        },
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message);
        }
    });

    const handleNextStep = (newData) => {
        Object.keys(newData).forEach((key) => {
            dispatch(updateProfileField({ field: key, value: newData[key] }));
        });
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = (updatedFormData) => {
        Object.keys(updatedFormData).forEach((key) => {
            dispatch(updateProfileField({ field: key, value: updatedFormData[key] }));
        });
        const payload = {
            ...formData,
            ...updatedFormData,
        };
        if (!isEditing) {
            mutation.mutate(payload);
        } else {
            navigate(previousRoute, { state: { isEditing: true, fromAccountSetup: true } });
        }
    };

    return (
        <AccountSetupLayout stepNumber={step} handlePreviousStep={handlePreviousStep} isEditing={isEditing}>
            {step === 1 && <AccountSetupStep1 formData={formData} handleNextStep={handleNextStep} />}
            {step === 2 && <AccountSetupStep2 formData={formData} handleNextStep={handleNextStep}  />}
            {step === 3 && <AccountSetupStep3 formData={formData} handleNextStep={handleNextStep} />}
            {step === 4 && <AccountSetupStep4 formData={formData} handleNextStep={handleNextStep} />}
            {step === 5 && <AccountSetupStep5 formData={formData} handleSubmit={handleSubmit} />}
        </AccountSetupLayout>
    );
}

export default AccountSetup;
