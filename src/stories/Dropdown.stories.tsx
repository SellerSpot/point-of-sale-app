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
    options: ['Automobiles', 'Art', 'Music', 'Music', 'Music', 'Music', 'Music', 'Music', 'Music', 'Music'],
    helperText: 'Sample Helper Text',
} as PropsType;
