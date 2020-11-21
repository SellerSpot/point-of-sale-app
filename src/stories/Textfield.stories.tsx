import React from 'react';
import '../styles/core.module.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TextField, PropsType } from '../components/TextField/TextField';

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
} as PropsType;
