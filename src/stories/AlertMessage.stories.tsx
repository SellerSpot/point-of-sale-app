import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { loadCSSValues } from '../config/cssVariables';
import { AlertMessage, IAlertMessageProps } from '../components/AlertMessage/AlertMessage';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: AlertMessage,
} as Meta;

const Template: Story<IAlertMessageProps> = (args: IAlertMessageProps) => (
    <AlertMessage {...args} />
);

export const AlertMessages = Template.bind({});
AlertMessages.args = {
    label: 'This is sample alert message',
    type: 'info',
    action: {
        actionLabel: 'Fix Issue',
        onClick: () => void 0,
    },
} as IAlertMessageProps;
