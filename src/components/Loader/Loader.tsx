import { Spinner } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import styles from './loader.module.scss';

export const Loader = (): ReactElement => {
    return (
        <div className={styles.loaderWrapper}>
            <Spinner size={'large'} />
        </div>
    );
};
