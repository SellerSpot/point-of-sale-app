import React from 'react';
import '../styles/core.module.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Dropdown, PropsType } from '../components/Dropdown/Dropdown';

export default {
    title: 'Components',
    component: Dropdown,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <Dropdown {...args} />;

export const Dropdowns = Template.bind({});
Dropdowns.args = {
    label: 'Sample Label',
    options: ['Option 1', 'Option 2', 'Option 3'],
} as PropsType;
