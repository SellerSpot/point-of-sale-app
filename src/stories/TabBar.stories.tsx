import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TabBar, PropsType } from '../components/TabBar/TabBar';
import { loadCSSValues } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: TabBar,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <TabBar {...args} />;

export const TabBars = Template.bind({});
TabBars.args = {
    tabs: ['Sales', 'Manager', 'Stock', 'Customers'],
    selectedTab: 1,
    onClickHandler: () => {
        // eslint-disable-next-line no-console
        // console.log(selectedIndex);
    },
} as PropsType;
