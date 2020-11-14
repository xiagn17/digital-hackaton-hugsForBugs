import React, { forwardRef } from 'react';
import { cnb } from 'cnbuilder';
import { ArrowBack } from '@material-ui/icons';

import Card from './common/Card';
import List from './common/List';

const SelectDeviceModel = forwardRef((props, ref) => {
    const { onClearCategory, classes, category, onChangeDevice } = props;

    return (
        <Card ref={ref}>
            <button
                onClick={onClearCategory}
                className={cnb(classes.clearButton, classes.button)}
            >
                <ArrowBack />
            </button>
            <List
                items={category?.devices}
                onChange={onChangeDevice}
            />
        </Card>
    );
});

export default SelectDeviceModel;
