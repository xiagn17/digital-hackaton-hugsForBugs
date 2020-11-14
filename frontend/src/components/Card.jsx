import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';

const useStyles = makeStyles(() => ({
    root: {
        display: 'inline-block',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 8px 1px rgba(0, 53, 114, 0.15)',
        borderRadius: 8,
        padding: 24,
        margin: 16,
    }
}));

const Card = forwardRef(({ children }, ref) => {
    const classes = useStyles();

    return (
        <div className={classes.root} ref={ref}>
            {children}
        </div>
    )
});

Card.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Card;
