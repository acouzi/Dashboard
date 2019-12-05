import React from "react";
import {Card, Dialog} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import withStyles from "@material-ui/core/styles/withStyles";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import IconButton from '@material-ui/core/IconButton';
import TuneSharpIcon from '@material-ui/icons/TuneSharp';
import {changeWeather, deleteMyWeather} from "../requests/Weather";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const styles  = ({
    card: {
        maxWidth: 300,
        width: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        backgroundColor: "#4898A6"
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: 20
    },
    divider: {
        margin: 10
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
});

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            type: "",
            humidity: "36",
            info: this.props.info,
            refresh: this.props.refresh,
            open: false,
            dragging: this.props.dragging
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleConfig = this.handleConfig.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getInput = this.getInput.bind(this);
        this.handleChangeWeather = this.handleChangeWeather.bind(this);

    }

    componentDidMount() {
        this.setState({city: this.state.info.city, type: this.state.info.type});
    }

    handleConfig() {
        this.state.dragging(true);
        this.setState({open: true});

    }

    handleClose() {
        this.state.dragging(false);
        this.setState({open: false});
    }


    handleChangeWeather() {
        let weather = {
            city: this.state.city,
            type: this.state.type,
            id: this.state.info.id
        };
        changeWeather(weather).then(response => {
            console.log(response);
            if (response.status === 200) {
                this.state.refresh();
            }
            this.handleClose();
        });
    }

    handleChange(event) {
        this.setState({type: event.target.value});
    }

    getInput(event) {
        this.setState({city: event.target.value});
    }

    handleDelete() {
        deleteMyWeather(this.state.info.id).then(response => {
            if (response.status === 200)
                this.state.refresh();
        });
    }

    render() {
        const { classes } = this.props;

        return(
            <Card className={classes.card} id={this.state.info.id}>
                <CardContent className={classes.content}>
                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                        style={{color: "white", textAlign: "center", fontSize: 30, fontWeight: 400}}
                    >
                        {this.state.info.city}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                        style={{color: "white", textAlign: "center", fontSize: 20, fontWeight: 700, marginLeft: 110}}
                    >
                        {Math.ceil(parseFloat(this.state.info.temperature))}{this.state.info.type === "celsius" ? "°C" : (this.state.info.type === "kelvin" ? "K" : "°F") }
                    </Typography>
                    <Divider className={classes.divider} light />
                    <IconButton aria-label="delete" onClick={this.handleDelete}>
                        <DeleteSharpIcon style={{color: "white"}}/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={this.handleConfig} style={{float: "right"}}>
                        <TuneSharpIcon style={{color: "white"}}/>
                    </IconButton>
                </CardContent>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth>
                    <DialogTitle id="draggable-dialog-title">
                        Modify {this.state.info.city} widget
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
                                onChange={ (event) => this.getInput(event)}
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
                            <FormHelperText>Select temperature type</FormHelperText>
                    </div>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleChangeWeather} color="primary">
                            Add city
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        );
    }
}

export default withStyles(styles)(WeatherCard);