import React from 'react';
import Button from "@material-ui/core/Button";
import {Table} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Card from "@material-ui/core/Card";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {createGame, getMyGames} from "../requests/Steam";
import SteamCell from "./SteamCell"

class Steam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: {},
            open: false,
            game: "",
            id_game: ""
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.refreshMyGames = this.refreshMyGames.bind(this);
    };

    componentDidMount() {
        this.refreshMyGames();
        setInterval(()=>{
            this.refreshMyGames();
        }, 65000);
    }

    refreshMyGames() {
        let user = JSON.parse(localStorage.getItem("user"));

        getMyGames(user.id).then(response => {
            if (response.status === 200) {
                this.setState({games: response.data});
            }
        });
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleSave() {
        let user = JSON.parse(localStorage.getItem("user"));

        if (this.state.id_game.length < 1)
            return;
        let game = {
            game_id: this.state.id_game,
            game: this.state.game,
            user_id: user.id
        };
        createGame(game).then(response => {
            if (response.status === 200) {
                this.setState({open: false});
                this.refreshMyGames();
            }
        });

    }

    getInput(event, type) {
        if (type === "game_name")
            this.setState({game: event.target.value});
        else
            this.setState({id_game: event.target.value});
    }

    render() {
        return (
            <div>
                <div>
                    <Button variant="contained" color="primary" onClick={this.handleOpen}
                            style={{float: "right", margin: 10}}>
                        Add game
                    </Button>
                </div>
                <div>
                    <Card style={{
                        backgroundColor: "#DAD8D8",
                        marginTop: 40,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "70%"
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">App ID</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Current Number of players</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                Object.values(this.state.games).map((game, index) => {
                                    return (
                                        <SteamCell key={index} refresh={this.refreshMyGames} info={game}/>
                                    );
                                })
                            }
                        </Table>
                    </Card>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        fullWidth
                    >
                        <DialogTitle id="draggable-dialog-title">
                            Add a game
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
                                value={this.state.game}
                                onChange={(event) => this.getInput(event, "game_name")}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="game"
                                label="Game id"
                                type="game"
                                fullWidth
                                style={{marginBottom: 20}}
                                value={this.state.id_game}
                                onChange={(event) => this.getInput(event, "game_id")}
                            />
                        </div>
                        <DialogActions>
                            <Button autoFocus onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSave} color="primary">
                                Add game
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default Steam;