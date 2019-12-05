import React from 'react';
import Background2 from '../images/background2.jpg'
import {Button, Typography} from "@material-ui/core";
import '../index.css';
import { Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import Bounce from 'react-reveal/Bounce';

class LandingPage extends React.Component {

    render() {
        return (
            <div>
                <AppBar style={{backgroundColor: "transparent"}} position="static">
                    <Toolbar>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <div>
                                    <Typography style={{paddingLeft: 80, color: "floralwhite"}} variant="h6">
                                        Dashboard Ole Ola
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <section id="main" style={{height: "-webkit-fill-available"}}>
                    <div className="main-text">
                        <Bounce left cascade>
                            <h4>Ole Ola. </h4>
                            <h4>A simple but</h4>
                            <h4>powerful dashboard</h4>
                        </Bounce>
                        <div style={{display: "flex", paddingTop: 30}}>
                            <div style={{paddingRight: 30, paddingLeft: 30}}>
                                <Link to={"/signin"} style={{textDecoration: "none", color: "inherit"}}><Button variant="contained" color="secondary" style={{padding: 15}}>Sign In <SendSharpIcon style={{paddingLeft: 10}} /></Button></Link>
                            </div>
                            <div>
                                <Link to={"/signup"} style={{textDecoration: "none", color: "inherit"}}><Button variant="contained" color="secondary" style={{padding: 15}}>Sign Up <CreateSharpIcon style={{paddingLeft: 10}}/></Button></Link>
                            </div>
                        </div>
                    </div>

                    <img src={Background2} width="1200" height="700" alt="" />
                </section>
            </div>
        );
    }
}

export default LandingPage;