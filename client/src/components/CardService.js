import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from '@material-ui/core/Checkbox';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const styles  = ({
    card: {
        maxWidth: 300,
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

class CardService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fill: this.props.fill,
            checked: false,
            numberChecked: 0,
            addService: this.props.addService,
            removeService: this.props.removeService,
            services: this.props.services
        };
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        let index = undefined;
        let user = JSON.parse(localStorage.getItem("user"));

        for (let i = 0; i < user.services.length; i++) {
            if (user.services[i] === this.state.fill.title)
                index = i;
        }
        if (index !== undefined)
            this.setState({checked: true});
    }

    handleCheck() {
        let name = this.state.fill.title;

        if (this.state.checked) {
            this.setState({checked: false});
            this.state.removeService(name);
        } else {
            this.setState({checked: true});
            console.log(name);
            this.state.addService(name);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="App">
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={this.state.fill.image}
                    />
                    <CardContent className={classes.content}>
                        <Typography
                            className={"MuiTypography--heading"}
                            variant={"h6"}
                            gutterBottom
                        >
                            {this.state.fill.title === "Pollution" ? "[Weather Widget] " + this.state.fill.title : this.state.fill.title}
                        </Typography>
                        <Typography
                            className={"MuiTypography--subheading"}
                            variant={"caption"}
                        >
                            {this.state.fill.description}
                        </Typography>
                        <Divider className={classes.divider} light />
                        <Checkbox
                            checked={this.state.checked}
                            onClick={this.handleCheck}
                            value="checkedA"
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(CardService);