import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Table, PropsType } from '../components/Table/Table';
import { loadCSSVariables } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSVariables();

export default {
    title: 'Components',
    component: Table,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <Table {...args} />;

export const Tables = Template.bind({});
Tables.args = {
    headings: ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5'],
    values: [
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
    ],
} as PropsType;
