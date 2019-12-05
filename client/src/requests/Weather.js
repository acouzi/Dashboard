import axios from "axios";

export async function createWeather(weather) {

    const response = await axios.post(
        'http://localhost:8080/saveWeather',
        { city: weather.city, type: weather.type, user_id: weather.user_id },
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}

export async function getMyWeather(user_id) {

    const response = await axios.get(
        'http://localhost:8080/findMyWeather?user_id=' + user_id
    );
    return (response);
}

export async function deleteMyWeather(id) {
    const response = await axios.delete(
        'http://localhost:8080/deleteMyWeather?id=' + id
    );
    return (response);
}

export async function changeWeather(weather) {
    const response = await axios.put(
        'http://localhost:8080/changeWeather',
        { city: weather.city, type: weather.type, id: weather.id },
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}

export async function createPollution(weather) {

    const response = await axios.post(
        'http://localhost:8080/savePollution',
        { city: weather.city, user_id: weather.user_id },
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}

export async function getMyPollution(user_id) {

    const response = await axios.get(
        'http://localhost:8080/getMyPollution?user_id=' + user_id
    );
    return (response);
}

export async function deleteMyPollution(user_id) {

    const response = await axios.delete(
        'http://localhost:8080/deleteMyPollution?id=' + user_id
    );
    return (response);
}

export async function changeMyPollution(pollution) {

    const response = await axios.put(
        'http://localhost:8080/changeMyPollution?city=' + pollution.city + '&id=' + pollution.id
    );
    return (response);
}