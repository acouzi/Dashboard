import React from "react";
import {Card, Dialog} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import withStyles from "@material-ui/core/styles/withStyles";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import IconButton from '@material-ui/core/IconButton';
import TuneSharpIcon from '@material-ui/icons/TuneSharp';
import {changeMyPollution, deleteMyPollution} from "../requests/Weather";
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

class PollutionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            info: this.props.info,
            refresh: this.props.refresh,
            open: false,
            dragging: this.props.dragging
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleConfig = this.handleConfig.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getInput = this.getInput.bind(this);
        this.handleChangePollution = this.handleChangePollution.bind(this);

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


    handleChangePollution() {
        let pollution = {
            id: this.state.info.id,
            city: this.state.city
        };

        changeMyPollution(pollution).then(response => {
            if (response.status === 200)
                this.state.refresh();
            this.handleClose();
        });
    }
    getInput(event) {
        this.setState({city: event.target.value});
    }

    handleDelete() {
        deleteMyPollution(this.state.info.id).then(response => {
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
                        style={{color: "white", textAlign: "center", fontSize: 20, fontWeight: 700, marginLeft: 100}}
                    >
                        {Math.ceil(parseFloat(this.state.info.pollution))} IQA
                    </Typography>

                    <Typography
                        style={{color: "white", textAlign: "center", fontSize: 20, fontWeight: 700}}
                    >
                        Danger: {(this.state.info.danger)}
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
                        Modify {this.state.info.city} widget pollution
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
                    </div>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleChangePollution} color="primary">
                            Change pollution city
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        );
    }
}

export default withStyles(styles)(PollutionCard);