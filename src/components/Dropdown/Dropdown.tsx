import React, { ReactNode, useEffect, useState } from 'react';
import styles from './dropdown.module.css';
import { FaCaretDown } from 'react-icons/fa';

export type PropsType = {
    label?: string;
    options: (string | number | JSX.Element)[];
    helperText?: string;
};

// used to generate the list of options to show
const generateOptions = (
    options: PropsType['options'],
    setSelectedOption: React.Dispatch<React.SetStateAction<number>>,
    shouldShowOptions: React.Dispatch<React.SetStateAction<boolean>>,
): ReactNode => {
    return options.map((option, index) => {
        return (
            <li
                onClick={() => {
                    setSelectedOption(index);
                    shouldShowOptions(false);
                }}
                key={index}
                className={styles.dropDownItem}
            >
                {option}
            </li>
        );
    });
};

// used to get the dropdown list classnames
const getDropDownListClassNames = (showOptions: boolean): string => {
    let classNames = styles.dropDownList;
    if (showOptions) classNames += ' ' + styles.active;
    else classNames += ' ' + styles.inactive;
    return classNames;
};

// used to get the name for the dropDown (and for the labels to attach to)
const getDropdownId = (props: PropsType): string => {
    return (
        (props.label === undefined ? (props.helperText === undefined ? 'nolable' : props.helperText) : props.label) +
        btoa(Math.random().toString()).substr(10, 5)
    );
};

export const Dropdown: React.FC<PropsType> = (props: PropsType): JSX.Element => {
    const [showOptions, shouldShowOptions] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<number>(-0);

    const handleClickOutsideHandler = () => shouldShowOptions(!showOptions);

    useEffect(() => {
        if (showOptions) document.addEventListener('click', handleClickOutsideHandler);
        return () => {
            document.removeEventListener('click', handleClickOutsideHandler);
        };
    }, [showOptions]);

    return (
        <div>
            {props.label !== undefined ? (
                <label className={styles.label} htmlFor={getDropdownId(props)}>
                    {props.label}
                </label>
            ) : null}
            <div className={styles.dropDownBox}>
                <div onClick={() => shouldShowOptions(!showOptions)} className={styles.dropDownSelect}>
                    <p>{props.options[selectedOption]}</p>
                    <FaCaretDown className={styles.caretIcon} />
                </div>
                <div className={getDropDownListClassNames(showOptions)}>
                    <ul>{generateOptions(props.options, setSelectedOption, shouldShowOptions)}</ul>
                </div>
            </div>
            {props.helperText !== undefined ? (
                <label className={styles.label + ' ' + styles.helperText} htmlFor={getDropdownId(props)}>
                    {props.helperText}
                </label>
            ) : null}
        </div>
    );
};
