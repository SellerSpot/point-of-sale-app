import React from 'react';

export type PropsType = {
    sampleValue: string;
};

export const Table: React.FC<PropsType> = (): JSX.Element => {
    return (
        <div>
            <div>Table Component</div>
        </div>
    );
};
