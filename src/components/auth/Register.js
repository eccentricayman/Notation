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
import {useForm} from 'react-hook-form';
import "./Register.css";

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

const Register = () => {
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const { register, handleSubmit, errors, watch } = useForm({
        mode: "onChange",
    });

    const poolData = {
        UserPoolId: '',
        ClientId: '',
    };

    const [submitting, setSubmitting] = useState(false);

    const onSubmit = (data) => {
        setSubmitting(true);
        console.log(data);
        setSubmitting(false);
    }
    console.log(errors);
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paper} elevation={2}>
                <Typography component='h1' variant="h5">
                    Sign up for Notation!
                </Typography>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                required
                                id="first-name"
                                label="First Name"
                                name="firstName"
                                variant="outlined"
                                autoFocus
                                fullWidth
                                inputRef={register({
                                    required: true,
                                    pattern: {
                                        value: /^\p{L}+$/u,
                                        message: "Please enter a valid name (UNICODE Letters only)",
                                    }

                                })}
                            />
                            {errors.firstName && errors.firstName.type === 'required' && (<p className='error'>Required Field</p>)}
                            {errors.firstName && errors.firstName.type === 'pattern' && (<p className='error'>{errors.firstName.message}</p>)}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                required
                                id="last-name"
                                label="Last Name"
                                name="lastName"
                                variant="outlined"
                                fullWidth
                                inputRef={register({
                                    required: true,
                                    pattern: {
                                        value: /^\p{L}+$/u,
                                        message: "Please enter a valid name (UNICODE Letters only)",
                                    },
                                })}
                            />
                            {errors.lastName && errors.lastName.type === 'required' && (<p className='error'>Required Field</p>)}
                            {errors.lastName && errors.lastName.type === 'pattern' && (<p className='error'>{errors.lastName.message}</p>)}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                required
                                id="outlined-required"
                                label="Email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                inputRef={register({
                                    required: true,
                                    pattern: {
                                        value: /^[^@]+@[^@]+\.[^@]+$/u,
                                        message: "Please enter a valid email",
                                    },
                                })}
                            />
                            {errors.email && errors.email.type === 'required' && (<p className='error'>Required Field</p>)}
                            {errors.email && errors.email.type === 'pattern' && (<p className='error'>{errors.email.message}</p>)}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outline-password-input"
                                label="Password"
                                name="password"
                                type="password"
                                variant='outlined'
                                fullWidth
                                inputRef={register({
                                    required: true, 
                                    minLength: 8,
                                    validate: (value) => {
                                        return [
                                            /[a-z]/,
                                            /[A-Z]/,
                                            /[0-9]/,
                                            /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/,
                                        ].every((pattern) => pattern.test(value));
                                    }

                                })}
                            />
                            {errors.password && errors.password.type === 'required' && (<p className='error'>Required Field</p>)}
                            {errors.password && errors.password.type === 'minLength' && (<p className='error'>Password must be 8 characters long!</p>)}
                            {errors.password && errors.password.type === 'validate' && (<p className='error'>Password must contain lowercase, uppercase, number, and special character.</p>)}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outline-password-confirm"
                                label="Confirm Password"
                                name="passwordConfirm"
                                type="password"
                                variant='outlined'
                                fullWidth
                                inputRef={register({
                                    required: true, 
                                    validate: (value) => {
                                        return value === watch('password');
                                    }
                                })}
                            />
                            {errors.password && errors.password.type === 'required' && (<p className='error'>Required Field</p>)}
                            {errors.passwordConfirm && errors.passwordConfirm.type === 'validate' && (<p className='error'>Passwords do not match!</p>)}
                        </Grid>
                    </Grid>
                    <Button
                        className={classes.submit}
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        disabled={submitting} 
                    >
                        Sign Up
                    </Button>

                    <Grid container justify="center">
                        <Grid item>
                            <Link href="#" variant='body1'>
                                Already have an Account? Sign In
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Register;
