import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { StatusFlag, PropsType } from '../components/StatusFlag/StatusFlag';
import { loadCSSValues } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: StatusFlag,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <StatusFlag {...args} />;

export const StatusFlags = Template.bind({});
StatusFlags.args = {
    type: 'completed',
} as PropsType;
