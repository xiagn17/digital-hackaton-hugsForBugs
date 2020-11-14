import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { cnb } from 'cnbuilder';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        padding: '8px 24px',
        backgroundColor: '#fff',
        border: '1px solid #2A5EA1',
        boxZizing: 'border-box',
        borderRadius: 24,
        marginBottom: 16,
        outline: 0,
    },
    active: {
        backgroundColor: '#2A5EA1',
        color: '#fff',
    },
}));

const SelectOption = (props) => {
    const { option, activeOption, onChange } = props;
    const classes = useStyles();

    const onClick = useCallback(() => {
        onChange(option);
    }, []);

    return (
        <button className={cnb(classes.root, { [classes.active]: activeOption?.label === option.label })} onClick={onClick}>
            {option.label}
        </button>
    );
};

SelectOption.propTypes = {
    option: PropTypes.object.isRequired,
    activeOption: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

export default SelectOption;