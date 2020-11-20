import React from 'react';
import '../styles/core.module.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, PropsType } from '../components/Button/Button';

export default {
    title: 'Components/Button',
    component: Button,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
    label: 'Default Button',
    variant: 'default',
} as PropsType;

export const SuccessButton = Template.bind({});
SuccessButton.args = {
    label: 'Success Button',
    variant: 'success',
} as PropsType;

export const DangerButton = Template.bind({});
DangerButton.args = {
    label: 'Danger Button',
    variant: 'danger',
} as PropsType;
