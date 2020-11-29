import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TextField, PropsType } from '../components/TextField/TextField';
import { loadCSSVariables } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSVariables();

export default {
    title: 'Components',
    component: TextField,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <TextField {...args} />;

export const TextFields = Template.bind({});
TextFields.args = {
    placeHolder: 'Sample Text Field',
    fullWidth: false,
    variant: 'default',
    disabled: false,
    label: 'Sample Label',
    value: '55865',
    helperText: 'Sample Helper Text',
    inputType: 'text',
} as PropsType;
