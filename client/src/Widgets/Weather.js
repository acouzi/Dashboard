import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from "@material-ui/core/FormHelperText";
import {createPollution, createWeather, getMyPollution, getMyWeather} from "../requests/Weather";
import Grid from "@material-ui/core/Grid";
import WeatherCard from "./WeatherCard";
import {Rnd} from "react-rnd";
import PollutionCard from "./PollutionCard";

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: [],
            pollutionArr: [],
            open: false,
            type: "celsius",
            city: "",
            pollution: false,
            openPollution: false,
            dragging: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleOpenPollution = this.handleOpenPollution.bind(this);
        this.handleClosePollution = this.handleClosePollution.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getInput = this.getInput.bind(this);
        this.refreshMyWeather = this.refreshMyWeather.bind(this);
        this.checkPollution = this.checkPollution.bind(this);
        this.getChange = this.getChange.bind(this);
        this.getPollution = this.getPollution.bind(this);
        this.handleSavePollution = this.handleSavePollution.bind(this);
        this.handleDragging = this.handleDragging.bind(this);
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.checkPollution(user.services);
        this.refreshMyWeather().then(function () {
            this.getPollution();
        }.bind(this));

        setInterval(() => {
            this.getPollution();
            this.refreshMyWeather()
        }, 65000);
    }

    handleDragging(type) {
        this.setState({dragging: type});
    }

    checkPollution(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "Pollution") {
                this.setState({pollution: true});
            }
        }
    }

    async refreshMyWeather() {
        let user = JSON.parse(localStorage.getItem("user"));

        getMyWeather(user.id).then(response => {
            if (response.status === 200) {
                this.setState({weather: response.data});
            }
        });
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClosePollution() {
        this.setState({openPollution: false});
    }

    handleOpenPollution() {
        this.setState({openPollution: true});
    }

    handleChange(event) {
        this.setState({type: event.target.value});
    }

    getInput(event) {
        this.setState({city: event.target.value});
    }

    getChange(event) {
        this.setState({cityPollution: event.target.value});
    }

    async getPollution() {
        let user = JSON.parse(localStorage.getItem("user"));

        getMyPollution(user.id).then(response => {
            console.log(response);
            this.setState({pollutionArr: response.data});
        });
    }

    handleSavePollution() {
        let user = JSON.parse(localStorage.getItem("user"));

        let pollution = {
            city: this.state.cityPollution,
            user_id: user.id
        };

        createPollution(pollution).then(response => {
            this.getPollution().then(function () {
                this.handleClosePollution();

            }.bind(this));

        });

    }

    handleSave() {
        let user = JSON.parse(localStorage.getItem("user"));

        let weather = {
            city: this.state.city,
            type: this.state.type,
            user_id: user.id
        };
        createWeather(weather).then(response => {
            console.log(response);
            if (response.status === 200) {
                this.refreshMyWeather();
            }
        });
        this.setState({open: false});
        this.setState({city: ""});
    }

    renderMap() {
        return this.state.weather.map((widget, index) => {
            return (
                <Rnd default={{
                    x: 10 + index * 350,
                    y: 0,
                    width: "auto",
                    height: "auto",
                }} disableDragging={this.state.dragging}><Grid item xs={3} style={{margin: 10}}>
                    <WeatherCard dragging={this.handleDragging} refresh={this.refreshMyWeather} info={widget}/>
                </Grid></Rnd>
            );
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Button variant="contained" color="primary" onClick={this.handleOpen}
                            style={{float: "right", margin: 10}}>
                        Add city
                    </Button>
                    {this.state.pollution ?
                        <Button variant="contained" color="primary" onClick={this.handleOpenPollution}
                                style={{float: "right", margin: 10}}>
                            Add Pollution
                        </Button> : ""}
                </div>
                <div style={{height: "600px", width: "-webkit-fill-available"}}>
                    <Grid container spacing={0}>
                        {this.renderMap()}
                        {this.state.pollutionArr.map((res, index) => {
                            return (
                                <Rnd default={{
                                    x: 10 + index * 350,
                                    y: 250 + index,
                                    width: "auto",
                                    height: "auto",
                                }} disableDragging={this.state.dragging}><Grid item xs={3} style={{margin: 10}}> <PollutionCard dragging={this.handleDragging}
                                                                                          refresh={this.getPollution}
                                                                                          key={index} info={res}/>
                                </Grid></Rnd>
                            )
                        })}
                    </Grid>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="draggable-dialog-title">
                        Add a city
                    </DialogTitle>
                    <div style={{margin: 30}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="city"
                            label="Select city"
                            type="city"
                            fullWidth
                            style={{marginBottom: 20}}
                            value={this.state.city}
                            onChange={(event) => this.getInput(event)}
                        />

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.type}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={"celsius"}>Celsius</MenuItem>
                            <MenuItem value={"fahrenheit"}>Fahrenheit</MenuItem>
                            <MenuItem value={"kelvin"}>Kelvin</MenuItem>
                        </Select>
                        <FormHelperText>Select temperature type</FormHelperText></div>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Add city
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.openPollution}
                    onClose={this.handleClosePollution}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="draggable-dialog-title">
                        Add a city for pollution index
                    </DialogTitle>
                    <div style={{margin: 30}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="city"
                            label="Select city"
                            type="city"
                            fullWidth
                            style={{marginBottom: 20}}
                            value={this.state.cityPollution}
                            onChange={(event) => this.getChange(event)}
                        />
                    </div>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClosePollution} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSavePollution} color="primary">
                            Add pollution
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Weather;