import React from 'react';
import { cnb } from 'cnbuilder';
import { Dialog, DialogTitle, DialogContent, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router-dom';
import Routes from "../../const/Routes";

const Transition = React.forwardRef(function Transition(
    props,
    ref,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
    paper: {
        maxWidth: 410,
        padding: 16,
        backgroundColor: '#fff',
        boxShadow: '0px 0px 8px 1px rgba(0, 53, 114, 0.15)',
        borderRadius: 8,
        textAlign: 'center'
    },
    header: {
        color: '#2A5EA1',
        fontWeight: 700,
    },
    details: {
        textAlign: 'justify',
    },
    button: {
        paddingLeft: 0,
        outline: 0,
        border: 0,
        color: '#2A5EA1',
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    finishButton: {
        marginTop: 24,
        color: '#fff',
        backgroundColor: '#2A5EA1',
        borderRadius: 24,
        padding: '8px 24px',
        margin: '0 auto',
    },
    backdrop: {
        background: 'linear-gradient(180deg, #003572 0%, #618BD3 100%)',
    }
}));

const RESULTS = {
    success: {
        title: 'Практическое задание выполнено успешно',
        details: '',
        buttonText: 'Перейти к тесту',
    },
    failure: {
        title: 'Задание не выполнено',
        details: 'При выполнении практического задания были допущены одна или несколько ошибок. Для лучшего закрепления материала просмотрите решение заново и исправьте отмеченные ошибки',
        buttonText: 'Посмотреть ошибки',
    },
};

const TaskResultDialog = (props) => {
    const { result, onClose, open } = props;
    const classes = useStyles();

    const history = useHistory();

    const onFinish = () => {
        if (result === 'success') {
            history.push(Routes.test.path);
        } else {
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            classes={{
                paper: classes.paper,
            }}
            BackdropProps={{
                classes: {
                    root: cnb({ [classes.backdrop]: result === 'success' }),
                }
            }}
            onBackdropClick={onFinish}
            maxWidth="lg"
        >
            <DialogTitle>
                <Grid container alignItems="center" justify="center">
                    <Grid item>
                        <Typography className={classes.header} variant="h5">
                            {RESULTS[result].title}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Typography className={classes.details}>
                    {RESULTS[result].details}
                </Typography>
                <Grid container justify="center">
                    <button className={cnb(classes.button, classes.finishButton)} onClick={onFinish}>
                        {RESULTS[result].buttonText}
                    </button>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default TaskResultDialog;
