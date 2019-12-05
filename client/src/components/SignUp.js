import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import {createUser} from "../requests/User";

const useStyles = {
    '@global': {
        body: {
            backgroundColor: "white",
        },
    },
    paper: {
        marginTop: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: 10,
        backgroundColor: "#3F51B5",
    },
    form: {
        width: '100%',
        marginTop: 30,
    },
    submit: {
        marginTop: 10,
        marginBottom: 10
    },
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            email: ""
        };

        this.getInput = this.getInput.bind(this);
        this.postUser = this.postUser.bind(this);
        this.stringToArrayServices = this.stringToArrayServices.bind(this);
    }

    getInput(event, type) {
        if (type === "firstName")
            this.setState({firstName: event.target.value});
        if (type === "lastName")
            this.setState({lastName: event.target.value});
        if (type === "password")
            this.setState({password: event.target.value});
        if (type === "email")
            this.setState({email: event.target.value});
    }

    stringToArrayServices(data) {
        let services = data.services;

        services = services.split(';');
        services.splice( services.indexOf(""), 1 );
        return (services);
    }

    postUser() {
        if (this.state.firstName.length < 0 || this.state.firstName.length < 0 ||
            this.state.email.length < 0 || this.state.password.length < 0)
            return;
        const user = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            mail: this.state.email,
            password: this.state.password
        };
        createUser(user).then(response => {
            if (response.status === 200) {
                response.data.services = this.stringToArrayServices(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.assign("http://localhost:3000/dashboard");
            } else {
                alert("An error has occurred");
            }
        });
    }

    render() {
        const {classes} = this.props;
        return(
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={ (event) => this.getInput(event, "firstName")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={ (event) => this.getInput(event, "lastName")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={ (event) => this.getInput(event, "email")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={ (event) => this.getInput(event, "password")}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.postUser}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(SignUp);