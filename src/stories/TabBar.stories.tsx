import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TabBar, ITabBarProps } from '../components/TabBar/TabBar';
import { loadCSSValues } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: TabBar,
} as Meta;

const Template: Story<ITabBarProps> = (args: ITabBarProps) => <TabBar {...args} />;

export const TabBars = Template.bind({});
TabBars.args = {
    tabs: [
        {
            name: 'Products',
        },
        {
            name: 'Categories',
        },
        {
            name: 'Brands',
        },
        {
            name: 'Tax Brackets',
        },
    ],
    selectedTab: 0,
    onSelect: () => void 0,
} as ITabBarProps;
