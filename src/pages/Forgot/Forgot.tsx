import React, { ReactElement, useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import styles from './forgot.module.scss';
import { UnderDevelopment } from 'components/UnderDevelopment/UnderDevelopment';
import { Button, InputField } from '@sellerspot/universal-components';
import signInStyles from '../SignIn/signin.module.scss';

export const Forgot = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false);
    }, []);
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={styles.forgotWrapper}>
                    <div className={styles.redirectActionHolder}>
                        <div>Sign In Instead ?</div>
                        <div>
                            <Button
                                label={'Sign in now'}
                                type={'button'}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'blue',
                                    fontWeight: 'normal',
                                    padding: 0,
                                    width: 'auto',
                                    marginLeft: 8,
                                    border: 'none',
                                    fontSize: 18,
                                }}
                                onClick={() => history.push(ROUTES.AUTH_SIGN_IN)}
                            />
                        </div>
                    </div>
                    <div className={styles.forgotContainer}>
                        <div className={styles.forgotTitle}>Forgot Password?</div>
                        <div className={styles.forgotInstructions}>
                            Enter the email address you used when you joined and we’ll send you
                            instructions to reset your password. <br />
                            <br />
                            For security reasons, we do NOT store your password. So rest assured
                            that we will never send your password via email.
                        </div>
                        <form className={styles.formContainer}>
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
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <Button
                                    label={'Send Reset Instructions'}
                                    type={'submit'}
                                    className={signInStyles.submitButton}
                                    style={{
                                        opacity: 1,
                                    }}
                                />
                            </div>
                        </form>
                        <div
                            style={{
                                height: 'auto',
                                marginTop: 50,
                            }}
                        >
                            <UnderDevelopment />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
