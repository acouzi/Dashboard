import axios from "axios";

export async function createChannel(channel) {

    const response = await axios.post(
        'http://localhost:8080/saveChannel',
        JSON.stringify(channel),
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}

export async function findMyChannels(id) {

    const response = await axios.get(
        'http://localhost:8080/fetchMyChannels?user_id=' + id
    );
    return (response);
}

export async function deleteMyChannel(id) {

    const response = await axios.delete(
        'http://localhost:8080/deleteMyChannel?id=' + id
    );
    return (response);
}

export async function changeMyChannel(channel) {

    const response = await axios.put(
        'http://localhost:8080/changeMyChannel',
        {channel: channel.channel, id: channel.id},
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}