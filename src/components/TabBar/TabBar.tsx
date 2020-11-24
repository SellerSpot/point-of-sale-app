import React from 'react';
// import styles from '../header.module.css';

export type PropsType = {
    tabs: string[];
};

export const TabBar: React.FC<PropsType> = (props: PropsType): JSX.Element => {
    return (
        <div>
            <div>{props.tabs}</div>
        </div>
    );
};
