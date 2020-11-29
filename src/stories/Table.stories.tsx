import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Table, ITableProps } from '../components/Table/Table';
import { loadCSSValues } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: Table,
} as Meta;

const Template: Story<ITableProps> = (args: ITableProps) => <Table {...args} />;

export const Tables = Template.bind({});
Tables.args = {
    headers: ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5'],
    rowData: [
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
    ],
} as ITableProps;
