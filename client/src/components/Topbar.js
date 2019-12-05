import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import { Link} from "react-router-dom";

class Topbar extends React.Component {

    render() {
        return(
            <div>
                <AppBar style={{backgroundColor: "transparent"}} position="static">
                    <Toolbar>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <div>
                                    <Typography style={{paddingLeft: 80, color: "#FAEBD7"}} variant="h6">
                                        Dashboard Ole Ola
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <Link style={{textDecoration: "none", color: "inherit"}} to={"/signin"}><Button style={{float: "right", color: "black", fontFamily: "Poppins, sans-serif"}} color="inherit">Sign in</Button></Link>
                                    <Link style={{textDecoration: "none", color: "inherit"}} to={"/signup"}><Button style={{float: "right", color: "black", fontFamily: "Poppins, sans-serif"}} color="inherit">Sign up</Button></Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
export default Topbar;