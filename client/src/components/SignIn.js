import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connectUser} from "../requests/User";

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
        marginTop: 20,
    },
    submit: {
        marginTop: 10,
        marginBottom: 10
    },
};


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.getInput = this.getInput.bind(this);
        this.connectionUser = this.connectionUser.bind(this);
        this.stringToArrayServices = this.stringToArrayServices.bind(this);
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));

        if (user != null) {
            window.location.assign("http://localhost:3000/dashboard");
            console.log(user);
        }
    }

    getInput(event, type) {
        if (type === "email")
            this.setState({email: event.target.value});
        if (type === "password")
            this.setState({password: event.target.value});
    }

    stringToArrayServices(data) {
        let services = data.services;

        services = services.split(';');
        services.splice( services.indexOf(""), 1 );
        return (services);
    }

    connectionUser() {
        if (this.state.email.length <= 0 && this.state.password.length <= 0)
            return;
        const user = {
            mail: this.state.email,
            password: this.state.password,
        };

        connectUser(user).then(response => {
            if (response.status === 200 && response.data !== "") {
                response.data.services = this.stringToArrayServices(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.assign("http://localhost:3000/dashboard");
            } else {
                alert("Wrong credentials");
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
                    </Avatar >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Your email account"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={this.state.email}
                            onChange={ (event) => this.getInput(event, "email")}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={ (event) => this.getInput(event, "password")}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.connectionUser}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgetpassword" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(SignIn);