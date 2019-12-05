package com.oleola.server.service;

import com.oleola.server.model.News;
import com.oleola.server.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService implements INewsService {

    CloseableHttpClient httpclient = HttpClients.createDefault();

    @Autowired
    private NewsRepository repository;

    @Override
    public List<News> findAll() {
        return repository.findAll();
    }

    @Override
    public JSONObject fetchInfoNews(String category, String language) throws IOException, JSONException {
        HttpGet httpget = new HttpGet(
                "https://newsapi.org/v2/everything?q=" + category + "&sortBy=publishedAt&apiKey=f1fac77f10854a9693d2c360e35eb1b0&language=" + language);
        HttpResponse httpresponse = httpclient.execute(httpget);
        String json = EntityUtils.toString(httpresponse.getEntity());
        JSONObject jsonObject = new JSONObject(json);

        return jsonObject;
    }

    @Override
    public void createNews(String category, String language, Integer user_id) throws IOException, JSONException {
        News n;
        category = category.replaceAll(" ", "%20");
        JSONObject res = fetchInfoNews(category, language);
        JSONArray arr = (JSONArray) res.get("articles");
        JSONObject info;

        for (int i = 0; i < arr.length() && i < 3; i++) {
            n = new News();
            info = arr.getJSONObject(i);
            n.setAuthor(info.getString("author"));
            n.setTitle(info.getString("title"));
            n.setImg(info.getString("urlToImage"));
            n.setContent(info.getString("content"));
            n.setId_user(user_id);
            n.setCategory(category);
            n.setLanguage(language);
            repository.save(n);
        }
    }

    @Override
    public List<News> getNews(Integer id) {
        return repository.fecthMyNews(id);
    }

    @Override
    public void deleteNews(Long id) {
        repository.deleteById(id);
    }
}
