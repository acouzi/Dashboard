import React from 'react';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import CloudSharpIcon from '@material-ui/icons/CloudSharp';
import SportsEsportsSharpIcon from '@material-ui/icons/SportsEsportsSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import ChromeReaderModeSharpIcon from '@material-ui/icons/ChromeReaderModeSharp';
import Flip from 'react-reveal/Flip';
import Zoom from 'react-reveal/Zoom';
import Fab from '@material-ui/core/Fab';
import MonetizationOnSharpIcon from '@material-ui/icons/MonetizationOnSharp';
import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import SwipeableViews from 'react-swipeable-views';
import {
    Link
} from "react-router-dom";
import Weather from "../Widgets/Weather";
import Steam from "../Widgets/Steam";
import Youtube from "../Widgets/Youtube";
import News from "../Widgets/News";
import Trade from "../Widgets/Trade";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            user: JSON.parse(localStorage.getItem("user")) !== null ? JSON.parse(localStorage.getItem("user")) : window.location.assign("http://localhost:3000/signin") ,
            value: 0,
            object: null,
            chooseService: false,
            widget: {
            },
            allServices: ["Weather", "Steam", "Reddit", "Yammer", "Youtube"]
        };
        this.checkService = this.checkService.bind(this);
        this.handleCloseService = this.handleCloseService.bind(this);
        this.handleOpenService = this.handleOpenService.bind(this);
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem("user"));

        if (user == null) {
            window.location.assign("http://localhost:3000/signin");
        }
        this.setState({name: user.first_name + " " + user.last_name});
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = value => {
        this.setState({
            value,
        });
    };

    handleOpenService() {
        this.setState({ chooseService: true });

    };

    handleCloseService() {
        this.setState({ chooseService: false });
    };


    checkService(name) {
        if (name === "Weather")
            return <CloudSharpIcon/>;
        if (name === "Profile")
            return <AccountCircleSharpIcon/>;
        if (name === "Steam")
            return <SportsEsportsSharpIcon/>;
        if (name === "Trade")
            return <MonetizationOnSharpIcon/>;
        if (name === "Youtube")
            return <PlayCircleFilledOutlinedIcon/>;
        if (name === "News")
            return <ChromeReaderModeSharpIcon/>;
    };

    render() {

        return (
            <div>
                <div style={{width: "100%", background:  "linear-gradient(to right, #2c3e50, #4ca1af)", height: "200px", textAlign: "center"}}>
                    <div style={{marginTop: 50, display: "inline-block"}}>
                        <Zoom>
                        <Typography style={{color: "floralwhite", fontWeight: 700, fontSize: 25}}>
                            Welcome {this.state.name}
                        </Typography>
                        </Zoom>
                        <Divider style={{backgroundColor: "white", width: "50%", display: "-webkit-inline-box"}}/>
                        <Flip left>
                            <Typography style={{color: "floralwhite", fontWeight: 700, fontSize: 15}}>
                                Dashboard Ole Ola
                            </Typography>
                        </Flip>
                    </div>
                </div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    {
                        this.state.user.services.map((service) => {
                        let icon = this.checkService(service);

                        if (service === "Pollution")
                            return "";
                        return (
                            <Tab
                                key={service}
                                label={service}
                                icon={icon}
                            />
                        );
                    })}
                </Tabs>
                <Divider/>

                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    {this.state.user.services.map((service, i) => {
                        let comp = undefined;

                        if (service === "Weather")
                            comp = <Weather key={i}/>;
                        else if (service === "Steam")
                            comp = <Steam key={i}/>;
                        else if (service === "Youtube")
                            comp = <Youtube key={i} />;
                        else if (service === "News")
                            comp = <News key={i}/>;
                        else if (service === "Pollution")
                            comp = <div key={"Poll" + i}></div>;
                        else if (service === "Trade")
                            comp = <Trade key={i} />;
                        else
                            comp = <div key={"ok"}></div>;
                        return (
                            comp
                        );
                    })}
                </SwipeableViews>
                <Link to={"/services"} ><Fab onClick={this.handleOpenService} color="primary" aria-label="add" size="large" style={{position: 'absolute', bottom: 20, right: 30}}>
                    <AddSharpIcon />
                </Fab></Link>
            </div>
        );
    }
}

export default Dashboard;