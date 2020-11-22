import React from 'react';
import '../styles/core.module.css';
import fontSize from '../styles/fontsize.module.css';
import { Story, Meta } from '@storybook/react/types-6-0';

const FontSizeComponent = (): JSX.Element => (
    <div>
        <div className={fontSize.masterFontSize}>Lorem, ipsum dolor sit amet consectetur.</div>
        <div className={fontSize.headerFontSize}>Lorem, ipsum dolor sit amet consectetur.</div>
        <div className={fontSize.defaultFontSize}>Lorem, ipsum dolor sit amet consectetur.</div>
        <div className={fontSize.secondaryFontSize}>Lorem, ipsum dolor sit amet consectetur.</div>
        <div className={fontSize.tertiaryFontSize}>Lorem, ipsum dolor sit amet consectetur.</div>
    </div>
);

export default {
    title: 'Components',
    component: FontSizeComponent,
} as Meta;

const Template: Story = (args) => <FontSizeComponent {...args} />;

export const FontSize = Template.bind({});
FontSize.args = {};
