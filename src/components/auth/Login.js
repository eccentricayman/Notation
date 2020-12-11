import React, {useState} from 'react';
//import { CognitoUserPool } from 'amazon-cognito-identity-js';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(2,0,1),
    }
}));


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const poolData = {
        UserPoolId: '',
        ClientId: '',
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paper} elevation={2}>
                <Typography component='h1' variant="h5">
                    Sign In
                </Typography>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={onSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField 
                                required
                                id="outlined-required"
                                label="Email"
                                name="email"
                                variant="outlined"
                                value={email}
                                onChange={(evt) => {setEmail(evt.target.value)}}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outline-password-input"
                                label="Password"
                                name="password"
                                type="password"
                                variant='outlined'
                                value={password}
                                onChange={(evt) => {setPassword(evt.target.value)}}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Button
                        className={classes.submit}
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                    >
                        Sign In
                    </Button>

                    <Grid container justify="center">
                        <Grid item>
                            <Link href="#" variant='body1'>
                                Sign Up Here
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Login;
