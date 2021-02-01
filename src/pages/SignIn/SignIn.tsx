import React, { ReactElement, useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { batch, useDispatch } from 'react-redux';
import { updateGlobalServices } from 'config/globalConfig';
import cn from 'classnames';
import styles from './signin.module.scss';
import { Button, InputField } from '@sellerspot/universal-components';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { Space } from 'components/Space/Space';
import { showMessage } from 'utilities/notify';
import { authenticateUser } from 'requests/auth';
import { updateTenant } from 'store/models/core';

export const SignIn = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    useEffect(() => {
        setIsLoading(false);
    }, []);
    const onSignInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            const data = {
                email,
                password,
            };
            const response = await authenticateUser(data);
            if (response?.status && response?.data?.token && response?.data?.auth) {
                // updating the globals to know that the new token has arrived.
                batch(() => {
                    updateGlobalServices(response.data.token);
                    dispatch(updateTenant(response.data));
                });
            } else {
                throw response.error;
            }
        } catch (error) {
            console.error(error);
            showMessage(error ?? error.message, 'danger');
        } finally {
            setIsProcessing(false);
        }
    };
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={cn(styles.signInWrapper)}>
                    <div className={styles.signInContainer}>
                        <SectionTitle
                            style={{ fontSize: 30, paddingLeft: 0 }}
                            title={'Sigin in to SellerSpot POS'}
                        />
                        <form className={styles.formContainer} onSubmit={onSignInHandler}>
                            <div className={styles.inputGroup}>
                                <InputField
                                    label={'Email Address'}
                                    type={'email'}
                                    style={{
                                        label: {
                                            fontSize: 18,
                                        },
                                        input: {
                                            fontSize: 18,
                                            padding: '0 10px',
                                        },
                                    }}
                                    required={true}
                                    error={{
                                        showError: isError,
                                        errorMessage: errorMessage,
                                    }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <div className={styles.forgotPasswordHolder}>
                                    <Button
                                        label={'Forgot Password?'}
                                        type={'button'}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: 'blue',
                                            fontWeight: 'normal',
                                            padding: '0px',
                                            width: 'auto',
                                            height: 'auto',
                                            marginTop: 3,
                                            border: 'none',
                                        }}
                                        onClick={() => history.push(ROUTES.AUTH_FORGOT)}
                                    />
                                </div>

                                <InputField
                                    label={'Password'}
                                    type={'password'}
                                    value={password}
                                    required={true}
                                    style={{
                                        label: {
                                            fontSize: 18,
                                        },
                                        input: {
                                            fontSize: 18,
                                            padding: '0 10px',
                                        },
                                    }}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Space size={20} />
                            <div className={styles.inputGroup}>
                                <Button
                                    style={{
                                        opacity: isProcessing ? 0.5 : 1,
                                    }}
                                    className={styles.submitButton}
                                    status={isProcessing ? 'disabledLoading' : 'default'}
                                    label={isProcessing ? 'Signing In' : 'Sign In'}
                                    type={'submit'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
