import React, { ReactElement } from 'react';
import styles from './billingsetup.module.css';
import { Bill } from './components/Bill/Bill';

export const BillingSetup = (): ReactElement => {
    return (
        <div className={styles.billingSetupWrapper}>
            <div className={styles.billingConfigurationSection}></div>
            <div className={styles.billPreviewSection}>
                <div className={styles.billPreview}>
                    <Bill />
                </div>
            </div>
        </div>
    );
};
