import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import { cnb } from 'cnbuilder';

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        zIndex: 1000,
        display: 'inline-block',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 8px 1px rgba(0, 53, 114, 0.15)',
        borderRadius: 8,
        padding: 24,
        margin: 16,
    },
}));

const Card = forwardRef(({ children, className }, ref) => {
    const classes = useStyles();
    const cardRootClassName = cnb(classes.root, className);

    return (
        <div className={cardRootClassName} ref={ref}>
            {children}
        </div>
    );
});

Card.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Card;
