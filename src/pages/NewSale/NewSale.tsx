import React from 'react';
import { InputField } from '../../components/InputField/InputField';
import styles from './newsale.module.css';

export const NewSale = (): JSX.Element => {
    return (
        <div className={styles.newSalePage}>
            <div className={styles.leftPanel}>
                <div className={styles.searchFieldWrapper}>
                    <InputField borderStyle="shadow" placeHolder="Product Name / Code" onChange={() => void 0} />
                </div>
            </div>
            <div className={styles.rightPanel}></div>
        </div>
    );
};
