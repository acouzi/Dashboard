import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import YoutubeCard from "./YoutubeCard";
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {createChannel, findMyChannels} from "../requests/Youtube";
import {Rnd} from "react-rnd";

class Youtube extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            youtube: [],
            open: false,
            channel: "",
            loading: true,
            dragging: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.getInput = this.getInput.bind(this);
        this.getChannels = this.getChannels.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDragging = this.handleDragging.bind(this);
    }

    componentDidMount() {
        this.getChannels();
    }

    handleDragging(type) {
        this.setState({dragging: type});
    }

    handleSave() {
        let user = JSON.parse(localStorage.getItem("user"));

        let channel = {
            channel: this.state.channel,
            id: user.id
        };

        createChannel(channel).then(response => {
            this.getChannels();
            this.setState({loading: false});
            this.handleClose();
        });

    }

    getInput(event) {
        this.setState({channel: event.target.value});
    }

    getChannels() {
        let user = JSON.parse(localStorage.getItem("user"));

        findMyChannels(user.id).then(response => {
            this.setState({youtube: response.data});
        });
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOpen() {
        this.setState({open: true});
    }

    render() {
        return (
            <div>
                <div>
                    <Button variant="contained" color="primary" onClick={this.handleOpen}
                            style={{float: "right", margin: 10}}>
                        Add Youtube Channel
                    </Button>
                </div>
                <div style={{height: "-webkit-fill-available", width: "-webkit-fill-available"}}>
                    <Grid container spacing={0}>
                        {
                            this.state.youtube.map((channel, index) => {
                                return (

                                    <Rnd default={{
                                        x: 10 + index * 350,
                                        y: 0,
                                        width: "auto",
                                        height: "auto",
                                    }} disableDragging={this.state.dragging} > <YoutubeCard dragging={this.handleDragging} refresh={this.getChannels} fill={channel} key={index}/></Rnd>

                                )
                            })
                        }
                    </Grid>
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth
                >
                    <DialogTitle id="draggable-dialog-title">
                        Add a channel
                    </DialogTitle>
                    <div style={{margin: 30}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="game"
                            label="Game name"
                            type="game"
                            fullWidth
                            style={{marginBottom: 20}}
                            value={this.state.channel}
                            onChange={(event) => this.getInput(event)}
                        />
                    </div>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Add channel
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}

export default Youtube;