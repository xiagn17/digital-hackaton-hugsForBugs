import React, { useState } from 'react';
import Page from '../components/Page';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import routes from '../const/Routes';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #003572 0%, #618BD3 100%)',
    },
    form: {
        display: 'flex',
        width: '35%',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 466,
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'white',
        color: '#2A5EA1',
        '&:hover': {
            color: 'white',
        },
    },
    textField: {
        backgroundColor: 'white',
        borderRadius: '8px',
    },
    input: {},
}));

export default function Login() {
    const [user, setUser] = useState(null);
    const classes = useStyles();
    const { handleSubmit, control } = useForm();

    if (user) {
        return <Redirect to={routes.home.path} />;
    }

    return (
        <Page>
            <div className={classes.formWrapper}>
                <form className={classes.form} onSubmit={handleSubmit(setUser)}>
                    <Controller
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="loginId"
                        // label="Ваше имя"
                        placeholder="Ваше имя"
                        name="name"
                        autoFocus
                        control={control}
                        required
                        className={classes.textField}
                        inputProps={{ className: classes.input }}
                    />
                    <Controller
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="groupId"
                        // label="В какой вы гурппе"
                        placeholder="В какой вы гурппе"
                        type="number"
                        id="groupId"
                        control={control}
                        required
                        className={classes.textField}
                        inputProps={{ className: classes.input }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Вход
                    </Button>
                </form>
            </div>
        </Page>
    );
}
