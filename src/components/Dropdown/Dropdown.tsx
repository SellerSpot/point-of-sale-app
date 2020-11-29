import React, { useEffect, useState } from 'react';
import styles from './dropdown.module.css';
import { FaCaretDown } from 'react-icons/fa';
import { nanoid } from 'nanoid';

export interface IDropdownProps {
    options: string[];
    label?: string;
    helperText?: string;
    style?: React.CSSProperties;
    onSelect: (option: string) => void;
}

const defaultProps: IDropdownProps = {
    options: ['Sample Option 1', 'Sample Option 2'],
    onSelect: () => void 0,
};

// used to get the dropdown list classnames
const getDropDownListClassNames = (showOptions: boolean): string => {
    let classNames = styles.dropDownList;
    if (showOptions) classNames += ' ' + styles.active;
    else classNames += ' ' + styles.inactive;
    return classNames;
};

export const Dropdown: React.FC<IDropdownProps> = (props: IDropdownProps): JSX.Element => {
    const [showOptions, shouldShowOptions] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<number>(0);

    const handleClickOutsideHandler = () => shouldShowOptions(!showOptions);

    useEffect(() => {
        // to handle clicks outside the dropdown and close the options view
        if (showOptions) document.addEventListener('click', handleClickOutsideHandler);
        return () => {
            document.removeEventListener('click', handleClickOutsideHandler);
        };
    }, [showOptions]);

    // seasoning the props
    const sProps: IDropdownProps = {
        ...defaultProps,
        ...props,
    };

    // id for the dropdown box for the labels to attach to
    const dropdownBoxId = nanoid();

    return (
        <div>
            {sProps.label ?? false ? (
                <label className={styles.label} htmlFor={dropdownBoxId}>
                    {props.label}
                </label>
            ) : null}
            <div className={styles.dropDownBox} id={dropdownBoxId}>
                <div onClick={() => shouldShowOptions(!showOptions)} className={styles.dropDownSelect}>
                    <p>{sProps.options[selectedOption]}</p>
                    <FaCaretDown className={styles.caretIcon} />
                </div>
                <div className={getDropDownListClassNames(showOptions)}>
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
            {props.helperText !== undefined ? (
                <label className={styles.label + ' ' + styles.helperText} htmlFor={dropdownBoxId}>
                    {props.helperText}
                </label>
            ) : null}
        </div>
    );
};
