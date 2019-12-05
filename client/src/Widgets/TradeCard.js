import React from 'react';
import {Card, Dialog} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {changeMyTrade, deleteMyTrade} from "../requests/Trade";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import TuneSharpIcon from '@material-ui/icons/TuneSharp';

const styles  = ({
    card: {
        maxWidth: 300,
        width: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
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

class TradeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: "",
            info: this.props.info,
            refresh: this.props.refresh,
            open: false,
            dragging: this.props.dragging
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getInput = this.getInput.bind(this);
        this.handleConfig = this.handleConfig.bind(this);
    }

    handleOpen() {
        this.state.dragging(true);
        this.setState({open: true});
    }

    handleClose() {
        this.state.dragging(false);
        this.setState({open: false});
    }

    handleDelete() {
        deleteMyTrade(this.state.info.id).then(response => {
           this.state.refresh();
        });
    }

    getInput(event) {
        this.setState({symbol: event.target.value});
    }

    handleConfig() {
        let trade = {
            id: this.state.info.id,
            symbol: this.state.symbol
        };

        changeMyTrade(trade).then(response => {
            this.state.refresh();
            this.handleClose();
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                        style={{fontWeight: 700, fontSize: 25}}
                    >
                        {this.state.info.name} ({this.state.info.symbol})
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                        style={{fontSize: 16}}
                    >
                        Currency: {this.state.info.currency}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                        style={{float: "", fontSize: 16}}
                    >
                        <br />Current Price: {this.state.info.price}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                        style={{fontSize: 16}}
                    >
                       <br/> Volume: {parseInt(this.state.info.volume).toLocaleString()}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                        style={{fontSize: 16}}
                    >
                        <br/> Day high: {parseInt(this.state.info.day_high).toLocaleString()}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                        style={{float: "", fontSize: 16}}
                    >
                        <br/>Day low: {parseInt(this.state.info.day_low).toLocaleString()}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                        style={{float: "", fontSize: 16}}
                    >
                        <br/>Market place: {this.state.info.stock_exchange}
                    </Typography>
                    <Divider className={classes.divider} light />
                    <IconButton aria-label="delete" onClick={this.handleDelete}>
                        <DeleteSharpIcon style={{color: "grey"}}/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={this.handleOpen} style={{float: "right"}}>
                        <TuneSharpIcon style={{color: "grey"}}/>
                    </IconButton>
                </CardContent>
                <Dialog disableBackdropClick open={this.state.open} onClose={this.handleClose} fullWidth
                >
                    <DialogTitle id="draggable-dialog-title">
                        Edit a market stock
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
                        <Button onClick={this.handleConfig} color="primary">
                            Change market stock
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        );
    }
}

export default withStyles(styles)(TradeCard);