import axios from 'axios';

export async function createUser(user) {

    const response = await axios.post(
        'http://localhost:8080/createUser',
        JSON.stringify(user),
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}

export async function connectUser(user) {

    const response = await axios.post(
        'http://localhost:8080/checkUser',
        JSON.stringify(user),
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}

export async function changeServices(services, id) {

    const response = await axios.put(
        'http://localhost:8080/changeServices?services=' + services + '&id=' + id,
    );
    return (response);
}
