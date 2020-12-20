import React, { useCallback, useEffect, useState } from 'react';
import styles from './dropdown.module.css';
import { FaCaretDown } from 'react-icons/fa';

import cn from 'classnames';

export interface IDropdownProps {
    options: string[];
    label?: string;
    helperText?: string;
    style?: React.CSSProperties;
    error?: {
        showError: boolean;
        errorMessage: string;
    };
    onSelect: (option: string) => void;
}

const defaultProps: IDropdownProps = {
    options: ['Sample Option 1', 'Sample Option 2'],
    error: {
        errorMessage: 'Default error message',
        showError: false,
    },
    onSelect: () => void 0,
};

export const Dropdown: React.FC<IDropdownProps> = (props: IDropdownProps): JSX.Element => {
    const [showOptions, shouldShowOptions] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<number>(0);

    const handleClickOutsideHandler = useCallback(() => shouldShowOptions(!showOptions), [
        shouldShowOptions,
        showOptions,
    ]);

    useEffect(() => {
        // to handle clicks outside the dropdown and close the options view
        if (showOptions) document.addEventListener('click', handleClickOutsideHandler);
        return () => {
            document.removeEventListener('click', handleClickOutsideHandler);
        };
    }, [showOptions, handleClickOutsideHandler]);

    // seasoning the props
    const sProps: IDropdownProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div>
            {sProps.label ?? false ? <label className={styles.label}>{sProps.label}</label> : null}
            <div className={styles.dropDownBox} style={sProps.style}>
                <div
                    tabIndex={0}
                    onClick={() => shouldShowOptions(!showOptions)}
                    className={styles.dropDownSelect}
                >
                    <p>{sProps.options[selectedOption]}</p>
                    <FaCaretDown className={styles.caretIcon} />
                </div>
                <div
                    className={cn(
                        styles.dropDownList,
                        { [styles.active]: showOptions },
                        { [styles.inactive]: !showOptions },
                    )}
                >
                    <ul>
                        {sProps.options.map((option, index) => {
                            return (
                                <li
                                    onClick={() => {
                                        setSelectedOption(index);
                                        shouldShowOptions(false);
                                        sProps.onSelect(option);
                                    }}
                                    key={index}
                                    className={styles.dropDownItem}
                                >
                                    {option}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            {sProps.helperText !== undefined || sProps.error !== undefined ? (
                <label
                    className={cn(styles.label, styles.helperText, {
                        [styles.hintTextError]: sProps.error?.showError,
                    })}
                >
                    {sProps.error?.showError ? sProps.error.errorMessage : sProps.helperText}
                </label>
            ) : null}
        </div>
    );
};
