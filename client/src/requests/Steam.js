import axios from "axios";

export async function createGame(steam) {

    const response = await axios.post(
        'http://localhost:8080/saveGame',
        { game: steam.game, game_id: steam.game_id, user_id: steam.user_id },
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}

export async function getMyGames(user_id) {

    const response = await axios.get(
        'http://localhost:8080/findMyGames?user_id=' + user_id
    );
    return (response);
}

export async function deleteMyGame(id) {

    const response = await axios.delete(
        'http://localhost:8080/deleteMyGame?id=' + id
    );
    return (response);
}

export async function changeMyGame(game) {

    const response = await axios.put(
        'http://localhost:8080/changeMyGame',
        {id_game: game.id_game, game: game.game, id: game.id},
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}