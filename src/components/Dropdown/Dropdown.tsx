import React from 'react';
import styles from './dropdown.module.css';
import { FaCaretDown } from 'react-icons/fa';

export type PropsType = {
    label: string;
    options: string[];
};

export const Dropdown: React.FC<PropsType> = (): JSX.Element => {
    return (
        <div>
            <div className={styles.dropDownBox}>
                <p>Sample Text</p>
                <FaCaretDown className={styles.caretIcon} />
            </div>
        </div>
    );
};
