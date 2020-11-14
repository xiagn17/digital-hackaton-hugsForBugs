import React, { forwardRef } from 'react';
import { cnb } from 'cnbuilder';
import { ArrowBack } from '@material-ui/icons';
import { Button } from '@material-ui/core';

import Select from './common/Select';
import Card from './common/Card';
import List from './common/List';

const SelectDeviceModel = forwardRef((props, ref) => {
    const {
        onClearCategory,
        classes,
        category,
        onChangeDevice,
        detailedDevice,
    } = props;

    return (
        <Card ref={ref}>
            <button
                onClick={onClearCategory}
                className={cnb(classes.clearButton, classes.button)}
            >
                <ArrowBack />
            </button>
            <Select
                options={category?.devices || []}
                onChange={onChangeDevice}
                value={detailedDevice}
            />
        </Card>
    );
});

export default SelectDeviceModel;
