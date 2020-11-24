import React from 'react';
import '../styles/core.module.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TabBar, PropsType } from '../components/TabBar/TabBar';

export default {
    title: 'Components',
    component: TabBar,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <TabBar {...args} />;

export const TabBars = Template.bind({});
TabBars.args = {
    tabs: ['Sales', 'Manager', 'Stock', 'Customers'],
    selectedTab: 0,
    onClickHandler: () => {
        // eslint-disable-next-line no-console
        // console.log(selectedIndex);
    },
} as PropsType;
