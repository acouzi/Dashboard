import React from 'react';
import CardService from "./CardService";
import Trade from "../images/trade.jpg";
import Pollution from "../images/pollution.png";
import Steam from "../images/steam.jpg";
import Weather from "../images/weather.jpg";
import News from "../images/news.jpg";
import Youtube from "../images/youtube.jpg";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Grid from "@material-ui/core/Grid"
import {changeServices} from "../requests/User";

const properties = {
    trade: {
        title: "Trade",
        description: "Keep close on the stock market !",
        image: Trade
    },
    steam: {
        title: "Steam",
        description: "Get the number of players of the game you want !",
        image: Steam
    },
    weather: {
        title: "Weather",
        description: "Get today weather of any cities of your choice !",
        image: Weather
    },
    news: {
        title: "News",
        description: "Latest news about what you want in the language you wish to read !",
        image: News
    },
    youtube: {
        title: "Youtube",
        description: "View, rate, and share videos on the most used video platform!",
        image: Youtube
    },
    pollution: {
        title: "Pollution",
        description: "1000+ cities registered with current air pollution!",
        image: Pollution
    }
};

class ChooseService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            object: null,
            services: [],
            allServices: ["Weather", "Pollution", "Steam", "Trade", "News", "Youtube"]
        };
        this.addService = this.addService.bind(this);
        this.handleCloseService = this.handleCloseService.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.removeService = this.removeService.bind(this);
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem("user"));

        if (user === null) {
            window.location.assign("http://localhost:3000/signin");
        }

    }

    handleCloseService(state) {
        let user = JSON.parse(localStorage.getItem("user"));


        if (state === "yes") {
            let services = user.services;

            services = services.join(";");
            changeServices(services, user.id).then(response => {
               window.location.assign("http://localhost:3000/dashboard");
            });
        } else
            window.location.assign("http://localhost:3000/dashboard");
    };

    handleSave() {
        window.location.assign("http://localhost:3000/dashboard");
    }

    addService(name) {
        let user = JSON.parse(localStorage.getItem("user"));

        if (name === "Pollution") {
            user.services.push(name);
        } else {
            user.services.unshift(name);
        }
        localStorage.setItem('user', JSON.stringify(user));
    }

    removeService(name) {
        let index = undefined;
        let user = JSON.parse(localStorage.getItem("user"));


        index =  user.services.indexOf(name);
        user.services.splice(index, 1);
        localStorage.setItem('user', JSON.stringify(user));
    }

    render() {
        return (
            <div>
                <AppBar style={{ background:  "linear-gradient(to right, #2c3e50, #4ca1af)", position: "inherit"}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.handleCloseService} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" style={{marginLeft: 20, flex: 1, textAlign: "center"}}>
                            Services disponible
                        </Typography>
                        <Button autoFocus color="inherit" onClick={this.handleCloseService}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{marginTop: "2%"}}>
                    <Grid container spacing={1}>
                        {this.state.allServices.map((service, index) => {
                            let prop = undefined;

                            if (service === "Weather")
                                prop = properties.weather;
                            if (service === "Steam")
                                prop = properties.steam;
                            if (service === "Trade")
                                prop = properties.trade;
                            if (service === "Youtube")
                                prop = properties.youtube;
                            if (service === "News")
                                prop = properties.news;
                            if (service === "Pollution")
                                prop = properties.pollution;
                            return (
                                <Grid md={3} style={{margin: 10}}>
                                    <Grid item xs={12}>
                                      <CardService key={index} removeService={this.removeService} addService={this.addService} services={this.state.services} fill={prop}/>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default ChooseService;