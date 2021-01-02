import React, { ReactElement, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@sellerspot/universal-components';
import { Bill } from './components/Bill/Bill';
import { getBillingSetupStyles } from './billingSetup.styles';

export const BillingSetup = (): ReactElement => {
    const billReference = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => billReference.current,
    });

    const styles = getBillingSetupStyles();

    return (
        <div className={styles.billingSetupWrapper}>
            <div className={styles.billingConfigurationSection}>
                <Button label="Print Bill" style={{ width: 'auto' }} onClick={handlePrint} />
            </div>
            <div className={styles.billPreviewSection}>
                <div className={styles.billPreview}>
                    <Bill billReference={billReference} />
                </div>
            </div>
        </div>
    );
};
