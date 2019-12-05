import axios from "axios";

export async function createNews(news) {

    const response = await axios.post(
        'http://localhost:8080/createNews',
        JSON.stringify(news),
        {headers: {'Content-Type': 'application/json'}}
    );
    return (response);
}

export async function getNews(id) {

    const response = await axios.get(
        'http://localhost:8080/getNews?id=' + id,
    );
    return (response);
}

export async function deleteNews(id) {

    const response = await axios.delete(
        'http://localhost:8080/deleteNews?id=' + id,
    );
    return (response);
}