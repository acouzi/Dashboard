import React from 'react';
import {Card, Dialog} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import TuneSharpIcon from '@material-ui/icons/TuneSharp';
import {changeMyChannel, deleteMyChannel} from "../requests/Youtube";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
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

class YoutubeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: "",
            info: this.props.fill,
            refresh: this.props.refresh,
            open: false,
            dragging: this.props.dragging
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleConfig = this.handleConfig.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.getInput = this.getInput.bind(this);
    }

    handleDelete() {
        deleteMyChannel(this.state.info.id).then(response => {
           this.state.refresh();
        });
    }

    handleConfig() {
        let channel = {
            id: this.state.info.id,
            channel: this.state.channel
        };
        changeMyChannel(channel).then(response => {
            this.state.refresh();
            this.handleClose();
        });
    }

    handleClose() {
        this.state.dragging(false);

        this.setState({open: false});
    }

    handleOpen() {
        this.state.dragging(true);
        this.setState({open: true});
    }

    getInput(e) {
        this.setState({channel: e.target.value});
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={this.state.info.img}
                />
                <CardContent className={classes.content}>
                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                    >
                        {this.state.info.channel_name}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                    >
                        {parseInt(this.state.info.nbr_subs).toLocaleString()} subscribers
                    </Typography>
                    <Divider className={classes.divider} light />
                    <IconButton aria-label="delete" onClick={this.handleDelete}>
                        <DeleteSharpIcon style={{color: "grey"}}/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={this.handleOpen} style={{float: "right"}}>
                        <TuneSharpIcon style={{color: "grey"}}/>
                    </IconButton>
                </CardContent>
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
                            label="Channel name"
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
                        <Button onClick={this.handleConfig} color="primary">
                            Change channel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        );
    }
}

export default withStyles(styles)(YoutubeCard);