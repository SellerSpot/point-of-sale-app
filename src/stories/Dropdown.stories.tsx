import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Dropdown, IDropdownProps } from '../components/Dropdown/Dropdown';
import { loadCSSValues } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: Dropdown,
} as Meta;

const Template: Story<IDropdownProps> = (args: IDropdownProps) => <Dropdown {...args} />;

export const Dropdowns = Template.bind({});
Dropdowns.args = {
    label: 'Sample Label',
    options: ['Automobiles', 'Art', 'Music', 'Dance', 'Paper', 'Tailwind'],
    helperText: 'Sample Helper Text',
    onSelect: (option: string) => {
        // eslint-disable-next-line no-console
        console.log(option);
    },
} as IDropdownProps;
