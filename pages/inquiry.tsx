import { NextPage } from 'next';
import { useState } from 'react';

import useForm, { formResponse } from '../library/components/panels/form';
import PopUp from '../library/components/panels/notification';
import TextInput, {LongTextInput} from '../library/utils/input/text';
import Dropdown from '../library/utils/input/dropdown';

import DefaultHeader from '../library/utils/metadata/header'
import DefaultNav from '../library/components/bars/nav'
import DefaultFooter from '../library/components/bars/footer'

import defaultStyle from '../styles/pages/Default.module.css'
import style from '../styles/pages/Inquiry.module.css'
import { formColors } from '../styles/_colors';

const WorkRequestForm: NextPage = () => {

    const [isShowNotification, setIsShowNotification] = useState(false);
    const [notification, setNotification] = useState({
        title: '',
        message: '',
        redirect: '/inquiry',
        callback: popup_callback
    });

    const initValues = {
        fname: 'Enter your first name...',
        lname: 'Enter your last name...',
        email: 'Enter your email...',
        cname: 'Enter your company name...',
        website: 'Enter your company website...',
        budget: 'Enter your budget...',
        poi: 'Enter your program of interest...',
        message: 'Enter any additional information, comments, or questions you\'d like to share with us...'
    }

    const { values, onChange, onSubmit } = useForm(
        {
            endpoint: '/api/inquiry',
            method: 'POST'
        },
        initValues,
        callback);

    async function callback(response: formResponse) {
        setIsShowNotification(true);
        if (response.statusCode === 200) {
            setNotification({
                ...notification,
                title: 'Success',
                message: 'Request submitted. We will get back to you shortly.'
            });
        } else {
            setNotification({
                ...notification,
                title: 'Error',
                message: 'Your request could not be processed. Please try again later.'
            });
        }
    }

    async function popup_callback() {
        setIsShowNotification(false);
    }

    return (
        <div className={defaultStyle.container}>
            {/* This is the head of the DOM, not of the body */}
            <DefaultHeader/>
            <DefaultNav/>
            {
                isShowNotification &&
                <PopUp {...notification} />
            }
            <main className={defaultStyle.main}>
                <div className={style.customForm} style={{
                    backgroundColor: formColors.secondary.background,
                    color: formColors.secondary.text
                }}>
                    <p className={style.requiredDec}>(Required Field) *</p>
                    <form onSubmit={onSubmit}>
                        <TextInput 
                            name="name" 
                            id="name" 
                            label="Company Name"                     
                            placeholder={initValues.cname}
                            onChange={onChange} 
                            required={true} />

                        <TextInput
                            name="website"
                            id="website"
                            label="Company Website"
                            placeholder={initValues.website}
                            onChange={onChange}
                            required={false} />

                        <div className={style.nameGroup}>
                            <TextInput
                                name="fname"
                                id="fname"
                                label="First Name"
                                placeholder={initValues.fname}
                                onChange={onChange}
                                required={true} />

                            <TextInput 
                                name="lname"
                                id="lname"
                                label="Last Name"
                                placeholder={initValues.lname}
                                onChange={onChange}
                                required={true} />
                        </div>

                        <TextInput
                            name="email"
                            id="email"
                            type="text"
                            label="Email"
                            placeholder={initValues.email}
                            onChange={onChange}
                            required={true} />

                        <div className={style.dropGroup}>
                            <TextInput
                                name="budget"
                                id="budget"
                                label="Budget"
                                placeholder={initValues.budget}
                                onChange={onChange}
                                required={false} />
                                
                            <Dropdown
                                name="poi"
                                id="poi"
                                label="Program of Interest"
                                values={[
                                    { value: 'web', label: 'Web Development' },
                                    { value: 'mobile', label: 'Mobile Development' },
                                    { value: 'game', label: 'Game Development' },
                                ]}
                                />

                            <Dropdown
                                name="timeframe"
                                id="timeframe"
                                label="Timeframe"
                                values={[
                                    { value: '1', label: '1 Month' },
                                    { value: '3', label: '3 Months' },
                                    { value: '6', label: '6 Months' },
                                    { value: '12', label: '12 Months' },
                                ]}
                            />                            
                        </div>

                        <LongTextInput
                            name="message"
                            id="message"
                            label="Message"
                            placeholder={initValues.message}
                            required={true} />

                        <button type="reset" style={{
                            backgroundColor: formColors.button.warning,
                        }}>Clear</button>
                        <button type="submit" style={{
                            backgroundColor: formColors.button.primary,
                        }}>Submit</button>
                    </form>
                </div>
            </main>
            <DefaultFooter />
        </div>
    )
};

export default WorkRequestForm;