import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Dropdown, PropsType } from '../components/Dropdown/Dropdown';
import { loadCSSVariables } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSVariables();

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
    onSelect: (option: string) => {
        // eslint-disable-next-line no-console
        console.log(option);
    },
} as PropsType;
