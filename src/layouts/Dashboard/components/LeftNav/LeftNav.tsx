import React from 'react';
import leftNavStyles from './leftnav.module.css';
import { FaBoxOpen, FaCashRegister, IoMdCart } from 'react-icons/all';
import { COLORS } from '../../../../config/colors';
import { useHistory } from 'react-router-dom';

interface INavItem {
    color: string;
    Icon: React.ComponentType;
    title: string;
    onClick: () => void;
}

const NavItem = ({ Icon, color, onClick, title }: INavItem): JSX.Element => {
    return (
        <div className={leftNavStyles.navItem} style={{ color: color }} onClick={onClick}>
            <div className={leftNavStyles.navIcon}>
                <Icon />
            </div>
            <div className={leftNavStyles.navTitle}>{title}</div>
        </div>
    );
};

export const LeftNav = (): JSX.Element => {
    const history = useHistory();
    const navItem: INavItem[] = [
        {
            Icon: IoMdCart,
            color: COLORS['sales-icon-color'],
            onClick: () => history.push('/'),
            title: 'sales',
        },
        {
            Icon: FaBoxOpen,
            color: COLORS['inventory-icon-color'],
            onClick: () => history.push('/inventory'),
            title: 'inventory',
        },
        {
            Icon: FaCashRegister,
            color: COLORS['cashregister-icon-color'],
            onClick: () => history.push('/cashregister'),
            title: 'cash register',
        },
    ];
    return (
        <div className={leftNavStyles.leftNavWrapper}>
            <div className={leftNavStyles.storeNameHolder}>Store Name</div>
            {navItem.map((item, key) => (
                <NavItem key={key} Icon={item.Icon} color={item.color} onClick={item.onClick} title={item.title} />
            ))}
        </div>
    );
};
