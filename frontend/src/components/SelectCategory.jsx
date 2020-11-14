import React from 'react';
import { Typography } from '@material-ui/core';

import Card from './common/Card';
import Select from './common/Select';

const SelectCategory = (props) => {
    const { options, category, onChangeCategory, classes } = props;

    return (
        <Card>
            <Typography className={classes.headerText} variant="h6">
                Выбор устройства
                </Typography>
            <Select
                options={options}
                value={category}
                onChange={onChangeCategory}
            />
        </Card>
    )
};

export default SelectCategory;
