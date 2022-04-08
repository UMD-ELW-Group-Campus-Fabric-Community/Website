import { NextPage } from 'next';
import { useState } from 'react';

import useForm, { formResponse } from '../library/components/panels/form';
import PopUp from '../library/components/panels/notification';
import TextInput from '../library/utils/input/text';

import DefaultHeader from '../library/utils/metadata/header'
import DefaultNav from '../library/components/bars/nav'
import DefaultFooter from '../library/components/bars/footer'

import styles from '../styles/Home.module.css'

const WorkRequestForm: NextPage = () => {

    const [isShowNotification, setIsShowNotification] = useState(false);
    const [notification, setNotification] = useState({
        title: '',
        message: '',
        redirect: '/workreq',
        callback: popup_callback
    });

    const initValues = {
        name: 'Enter your name',
    }

    const { values, onChange, onSubmit } = useForm(
        {
            endpoint: '/api/workreq',
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
        <div className={styles.container}>
            {/* This is the head of the DOM, not of the body */}
            <DefaultHeader/>
            <DefaultNav/>
            {
                isShowNotification &&
                <PopUp {...notification} />
            }
            <main className={styles.main}>
                <div>
                    <h1>Work Request Form</h1>
                    <form onSubmit={onSubmit}>
                        <TextInput 
                            name="name" 
                            id="name" 
                            label="Name"                     
                            placeholder={initValues.name}
                            onChange={onChange} 
                            required />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </main>
            <DefaultFooter />
        </div>
    )
};

export default WorkRequestForm;