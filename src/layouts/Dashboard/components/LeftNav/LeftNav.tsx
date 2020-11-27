import React from 'react';
import leftNavStyles from './leftnav.module.css';
import { FaBoxOpen, FaCashRegister, IoMdCart } from 'react-icons/all';
import { useHistory } from 'react-router-dom';

interface INavItem {
    style: React.CSSProperties;
    Icon: React.ComponentType;
    title: string;
    onClick: () => void;
}

const NavItem = ({ Icon, style, onClick, title }: INavItem): JSX.Element => {
    return (
        <div className={leftNavStyles.navItem} style={style} onClick={onClick}>
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
            style: {
                color: 'var(--sales-color)',
            },
            onClick: () => history.push('/'),
            title: 'sales',
        },
        {
            Icon: FaBoxOpen,
            style: {
                color: 'var(--inventory-color)',
            },
            onClick: () => history.push('/inventory'),
            title: 'inventory',
        },
        {
            Icon: FaCashRegister,
            style: {
                color: 'var(--cashregister-color)',
            },
            onClick: () => history.push('/cashregister'),
            title: 'cash register',
        },
    ];
    return (
        <div className={leftNavStyles.leftNavWrapper}>
            <div className={leftNavStyles.contentWrapper}>
                <div className={leftNavStyles.storeNameHolder}>Store Name</div>
                {navItem.map((item, key) => (
                    <NavItem key={key} Icon={item.Icon} style={item.style} onClick={item.onClick} title={item.title} />
                ))}
            </div>
        </div>
    );
};
