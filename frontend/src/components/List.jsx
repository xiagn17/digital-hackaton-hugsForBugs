import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles(() => ({
    item: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    icon: {
        marginLeft: 13,
        minWidth: 0,
        color: '#2A5EA1',
    },
}));

const List = (props) => {
    const { items, onChange } = props;
    const classes = useStyles();

    return (
        <MuiList>
            {items.map((item) => (
                <ListItem key={item.label} className={classes.item}>
                    <ListItemText>
                        {item.label}
                    </ListItemText>
                    <ListItemIcon className={classes.icon} onClick={(() => onChange(item))}>
                        <InfoIcon />
                    </ListItemIcon>
                </ListItem>
            ))}
        </MuiList>
    );
};

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
};

List.defaultProps = {
    items: [],
    onChange: () => undefined,
};

export default List;
