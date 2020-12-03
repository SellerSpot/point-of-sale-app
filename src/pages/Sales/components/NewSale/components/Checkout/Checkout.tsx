import React, { ReactElement } from 'react';
import styles from './checkout.module.css';
import cn from 'classnames';

export const Checkout = (): ReactElement => {
    return <div className={cn(styles.checkoutWrapper)}></div>;
};
