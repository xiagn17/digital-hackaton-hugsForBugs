import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { emptyFunc } from '../../utils/emptyFunc';
import { ReactComponent as AddDeviceIcon } from '../../assets/imgs/icons/plus.svg';

const useStyles = makeStyles(() => ({
    item: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    iconButton: {
        marginLeft: 13,
        minWidth: 0,
        color: '#2A5EA1',
        cursor: 'pointer',
    },
}));

const List = (props) => {
    const { items, onChange } = props;
    const classes = useStyles();

    return (
        <MuiList>
            {items.map((item) => (
                <ListItem key={item.label} className={classes.item}>
                    <ListItemText>{item.label}</ListItemText>
                    <IconButton
                        size="small"
                        className={classes.iconButton}
                        onClick={() => onChange(item)}
                    >
                        <AddDeviceIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        className={classes.iconButton}
                        onClick={() => onChange(item)}
                    >
                        <InfoIcon />
                    </IconButton>
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
    onChange: emptyFunc,
};

export default List;
