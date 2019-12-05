import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogActions from "@material-ui/core/DialogActions";
import {createNews, getNews} from "../requests/News";
import NewsCard from "./NewsCard";

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            open: false,
            category: "",
            language: "fr",
            content: ""
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getInput = this.getInput.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentDidMount() {
        this.handleRefresh();
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleChange(event) {
        this.setState({language: event.target.value});
    }

    getInput(event) {
        this.setState({category: event.target.value});
    }

    handleSave() {
        let user = JSON.parse(localStorage.getItem("user"));

        let news = {
            category: this.state.category,
            language: this.state.language,
            user_id: user.id
        };
        createNews(news).then(response => {
            this.handleRefresh();
            this.handleClose();
        });
    }

    handleRefresh() {
        let user = JSON.parse(localStorage.getItem("user"));

        getNews(user.id).then(response => {
            console.log(response);
           this.setState({news: response.data});
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Button variant="contained" color="primary" onClick={this.handleOpen}
                            style={{float: "right", margin: 10}}>
                        Add Category
                    </Button>
                </div>
                <div style={{height: "-webkit-fill-available", width: "-webkit-fill-available"}}>
                    <Grid container spacing={0}>
                            {
                                this.state.news.map((news, index) => {
                                    return(
                                        <Grid item md={5} style={{margin: 20}}>
                                            <NewsCard info={news} refresh={this.handleRefresh} key={index}/>
                                        </Grid>
                                    )
                                })
                            }
                    </Grid>
                </div>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="draggable-dialog-title">
                        Add a category
                    </DialogTitle>
                    <div style={{margin: 30}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="category"
                            label="Choose category"
                            type="category"
                            fullWidth
                            style={{marginBottom: 20}}
                            value={this.state.category}
                            onChange={(event) => this.getInput(event)}
                        />

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.language}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={"fr"}>French</MenuItem>
                            <MenuItem value={"en"}>English</MenuItem>
                            <MenuItem value={"es"}>Spanish</MenuItem>
                        </Select>
                        <FormHelperText>Choose language</FormHelperText>
                    </div>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Add category
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default News;