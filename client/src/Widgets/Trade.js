import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {createTrade, getMyTrade} from "../requests/Trade";
import TradeCard from "./TradeCard";
import {Rnd} from "react-rnd";

class Trade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trade: [],
            open: false,
            symbol: "",
            dragging: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleDragging = this.handleDragging.bind(this);
    };

    componentDidMount() {
        this.handleRefresh();
        setInterval(() => {
            this.handleRefresh()
        }, 300000);
    }

    handleDragging(type) {
        this.setState({dragging: type});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOpen() {
        this.setState({open: true});
    }

    async handleRefresh() {
        let user = JSON.parse(localStorage.getItem("user"));

        getMyTrade(user.id).then(response => {
            this.setState({trade: response.data});
        })
    }

    handleSave() {
        let user = JSON.parse(localStorage.getItem("user"));

        let trade = {
            symbol: this.state.symbol,
            user_id: user.id
        };
        createTrade(trade).then(response => {
            if (response.status === 200) {
                this.handleRefresh().then(function() {
                    this.handleClose();
                }.bind(this));
            }
            this.handleClose();
        });
    }

    getInput(event) {
        this.setState({symbol: event.target.value});
    }

    render() {
        return (
            <div>
                <div>
                    <Button variant="contained" color="primary" onClick={this.handleOpen}
                            style={{float: "right", margin: 10}}>
                        Add market stock
                    </Button>
                </div>
                <div style={{height: "600px", width: "-webkit-fill-available"}}>
                    <Grid container spacing={0}>
                        {
                            this.state.trade.map((trade, index) => {
                               return ( <Rnd default={{
                                       x: 10 + index * 350,
                                       y: 10 + index,
                                       width: "auto",
                                       height: "auto",
                                   }} disableDragging={this.state.dragging} ><Grid item xs={3} style={{margin: 10}}>
                                    <TradeCard dragging={this.handleDragging} info={trade} refresh={this.handleRefresh} key={index}/>
                               </Grid></Rnd>)
                            })
                        }
                    </Grid>
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth
                >
                    <DialogTitle id="draggable-dialog-title">
                        Add a market stock
                    </DialogTitle>
                    <div style={{margin: 30}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="symbol"
                            label="Symbol"
                            type="symbol"
                            fullWidth
                            style={{marginBottom: 20}}
                            value={this.state.symbol}
                            onChange={(event) => this.getInput(event)}
                        />
                    </div>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Add market stock
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}

export default Trade;