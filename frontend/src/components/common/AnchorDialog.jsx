import React from 'react';
import { cnb } from 'cnbuilder';
import { Backdrop, Popover, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: 1300,
        color: '#333',
    },
    paper: {
        position: 'relative',
        zIndex: 500,
        margin: 0,
    },
}));

const AnchorDialog = (props) => {
    const {
        open,
        onClose,
        anchorEl,
        children,
        transformOrigin,
        anchorOrigin,
        marginThreshold,
        classes,
        ...other
    } = props;

    const styles = useStyles();

    return (
        <Popover
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
            classes={{ paper: cnb(classes?.paper, styles.paper) }}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            marginThreshold={marginThreshold}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...other}
        >
            <DialogContent classes={{ root: classes?.dialogContent }}>{children}</DialogContent>
        </Popover>
    );
};

export default AnchorDialog;
