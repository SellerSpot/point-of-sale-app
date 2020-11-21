import React, { ReactNode, useState } from 'react';
import styles from './dropdown.module.css';
import { FaCaretDown } from 'react-icons/fa';

export type PropsType = {
    label?: string;
    options: string[];
    helperText?: string;
};

type stateType = {
    showOptions: boolean;
    selectedOption: string;
};

// used to generate the list of options to show
const generateOptions = (
    options: PropsType['options'],
    setSelectedOption: React.Dispatch<React.SetStateAction<stateType>>,
): ReactNode => {
    return options.map((option) => {
        const safeKey = option.replaceAll(' ', '') + btoa(Math.random().toString()).substr(10, 5);
        return (
            <li
                onClick={() => setSelectedOption({ showOptions: false, selectedOption: option })}
                key={safeKey}
                className={styles.dropDownItem}
            >
                <input type="radio" className={styles.radio} id={safeKey} />
                <label htmlFor={option.replaceAll(' ', '')}>{option}</label>
            </li>
        );
    });
};

// used to get the dropdown list classnames
const getDropDownListClassNames = (optionsState: stateType): string => {
    let classNames = styles.dropDownList;
    if (optionsState.showOptions) classNames += ' ' + styles.active;
    else classNames += ' ' + styles.inactive;
    return classNames;
};

// const handleClickOutside = (
//     event: MouseEvent,
//     setOptionsState: React.Dispatch<React.SetStateAction<stateType>>,
//     optionsState: stateType,
// ) => {
//     const target = event.target as HTMLElement;
//     // // eslint-disable-next-line no-console
//     // console.log('Here it is');
//     setOptionsState({ ...optionsState, showOptions: false });
// };

// used to get the name for the dropDown (and for the labels to attach to)
const getDropdownId = (props: PropsType): string => {
    return (
        (props.label === undefined ? (props.helperText === undefined ? 'nolable' : props.helperText) : props.label) +
        btoa(Math.random().toString()).substr(10, 5)
    );
};

export const Dropdown: React.FC<PropsType> = (props: PropsType): JSX.Element => {
    const [optionsState, setOptionsState] = useState<stateType>({
        showOptions: false,
        selectedOption: 'Select Video Category',
    });

    // // to detect clicks outside
    // useEffect(() => {
    //     document.addEventListener('click', (event) => handleClickOutside(event, setOptionsState, optionsState), true);
    //     return () => {
    //         document.removeEventListener(
    //             'click',
    //             (event) => handleClickOutside(event, setOptionsState, optionsState),
    //             true,
    //         );
    //     };
    // }, []);
    return (
        <div>
            {props.label !== undefined ? (
                <label className={styles.label} htmlFor={getDropdownId(props)}>
                    {props.label}
                </label>
            ) : null}
            <div className={styles.dropDownBox}>
                <div
                    onClick={() => setOptionsState({ ...optionsState, showOptions: !optionsState.showOptions })}
                    className={styles.dropDownSelect}
                >
                    <p>{optionsState.selectedOption}</p>
                    <FaCaretDown className={styles.caretIcon} />
                </div>
                <div className={getDropDownListClassNames(optionsState)}>
                    <ul>{generateOptions(props.options, setOptionsState)}</ul>
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
