import React, { useState } from 'react';
import { Accordion, Typography, AccordionSummary, AccordionDetails, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useLocalStorage } from '../hooks/useLocalStorage';

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
    },
    accordeon: {
        padding: '12px 24px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 0px 8px 3px rgba(0, 53, 114, 0.15)',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#2A5EA1',
    },
    content: {
        color: '#2A5EA1',
    },
    expandIcon: {
        color: '#2A5EA1',
        width: 48,
        height: 48,
    },
}));

const TaskDetails = (props) => {
    const { title, content } = props;

    const classes = useStyles();
    const [storedValue, setStoredValue] = useLocalStorage('detailsHidden');
    const [expanded, setExpanded] = useState(storedValue === undefined ? true : !storedValue);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        if (!isExpanded) {
            setStoredValue(true);
        }
    };

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded} onChange={handleChange(true)} className={classes.accordeon}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.title}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.content}>
                        {content}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
};

export default TaskDetails;
