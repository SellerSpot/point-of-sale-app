import React from 'react';
import styles from './button.module.css';

export const IconButton: React.FC = (): JSX.Element => {
    return (
        <div>
            <button className={styles.success}>Sample common component</button>
        </div>
    );
};
