import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sample } from '../../components';
import { coreSelector, initiateHandshake } from '../../store/models/core';
import { HomeTab } from './components/HomeTab';

export const Home: FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const { coreHandshake } = useSelector(coreSelector);

    useEffect(() => {
        const timer = setTimeout((): void => {
            dispatch(initiateHandshake({ coreHandshake: true }));
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div>
            <h5>Home Page</h5>
            <p>using the home specific component</p>
            <HomeTab />
            <p>using the common componet sample</p>
            <Sample />
            <h3>core Handshake boolean from store {String(coreHandshake)}</h3>
        </div>
    );
};
