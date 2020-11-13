import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../components/Page';

const useStyles = makeStyles((theme) => ({
    dashboardWrapper: {
        backgroundColor: '#F3F3F3',
        height: '100%',
        padding: 16,
    },
}));

const DashboardHeader = () => {
    return (
        <>
            <Typography>Практическое задание 1/2</Typography>
        </>
    );
};

export default function Home() {
    const classes = useStyles();

    return (
        <Page headerContent={<DashboardHeader />}>
            <div className={classes.dashboardWrapper}></div>
        </Page>
    );
}
