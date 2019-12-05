import axios from "axios";

export async function createTrade(trade) {

    const response = await axios.post(
        'http://localhost:8080/saveTrade',
        {symbol: trade.symbol, user_id: trade.user_id },
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}

export async function getMyTrade(user_id) {

    const response = await axios.get(
        'http://localhost:8080/findMyTrade?id=' + user_id
    );
    return (response);
}

export async function deleteMyTrade(id) {

    const response = await axios.delete(
        'http://localhost:8080/deleteMyTrade?id=' + id
    );
    return (response);
}

export async function changeMyTrade(trade) {

    const response = await axios.put(
        'http://localhost:8080/changeMyTrade',
        {symbol: trade.symbol, id: trade.id},
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}