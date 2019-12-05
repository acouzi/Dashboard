import React from 'react';
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import {deleteNews} from "../requests/News";

const styles = ({
    card: {
        maxWidth: 300,
        width: "40%",
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

class NewsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info,
            refresh: this.props.refresh,
            open: false,
            category: "",
            language: "fr"
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleDelete() {
        deleteNews(this.state.info.id).then(response => {
            this.state.refresh();
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Card>
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
                        {this.state.info.title}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                    >
                        {(this.state.info.content)}
                    </Typography>
                    <Divider className={classes.divider} light/>
                    <IconButton aria-label="delete" onClick={this.handleDelete}>
                        <DeleteSharpIcon style={{color: "grey"}}/>
                    </IconButton>
                    <Typography className={"MuiTypography--subheading"}
                                variant={"caption"} style={{float: "right"}}>{this.state.info.author}</Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(NewsCard);