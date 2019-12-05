import React from 'react';
import {TableBody, TableCell} from "@material-ui/core";
import EditSharpIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import {changeMyGame, deleteMyGame} from "../requests/Steam";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class SteamCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game_id: "",
            game: "",
            nbr_player: "",
            info: this.props.info,
            refresh: this.props.refresh,
            open: false
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getInput = this.getInput.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        this.setState({game: this.state.info.game});
        this.setState({game_id: this.state.info.game_id});
    }

    handleSave() {
        let game = {
            game: this.state.game,
            id_game: this.state.game_id,
            id: this.state.info.id
        };
        changeMyGame(game).then(response => {
           if (response.status === 200)
               this.handleClose();
        });

    }

    handleOpen() {
        this.setState({open: true});
    }

    getInput(event, type) {
        if (type === "game_name")
            this.setState({game: event.target.value});
        else
            this.setState({game_id: event.target.value});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleDelete() {
        deleteMyGame(this.state.info.id).then(response => {
            if (response.status === 200)
                this.state.refresh();
        });
    }
    render() {
        return(
          <TableBody style={{backgroundColor: "#EDEAEA"}}>
              <TableCell align={"center"}> {this.state.info.game_id} </TableCell>
              <TableCell align={"center"}> {this.state.info.game} </TableCell>
              <TableCell align={"center"}> {parseInt(this.state.info.nbr_player).toLocaleString()} </TableCell>
              <TableCell align={"center"}> <IconButton> <EditSharpIcon onClick={this.handleOpen}/></IconButton> <IconButton> <DeleteSharpIcon onClick={this.handleDelete}/></IconButton></TableCell>
              <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                  fullWidth
              >
                  <DialogTitle id="draggable-dialog-title">
                      Edit {this.state.info.game}
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
                              onChange={ (event) => this.getInput(event, "game_name")}
                          />

                          <TextField
                              autoFocus
                              margin="dense"
                              id="game"
                              label="Game id"
                              type="game"
                              fullWidth
                              style={{marginBottom: 20}}
                              value={this.state.game_id}
                              onChange={ (event) => this.getInput(event, "game_id")}
                          />
                  </div>
                  <DialogActions>
                      <Button autoFocus onClick={this.handleClose} color="primary">
                          Cancel
                      </Button>
                      <Button onClick={this.handleSave} color="primary">
                          Edit game widget
                      </Button>
                  </DialogActions>
              </Dialog>
          </TableBody>
        );
    }
}

export default SteamCell;