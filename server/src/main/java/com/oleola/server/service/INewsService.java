package com.oleola.server.service;

import com.oleola.server.model.News;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;

public interface INewsService {
    List<News> findAll();
    void createNews(String category, String language, Integer user_id) throws IOException, JSONException;
    JSONObject fetchInfoNews(String category, String language) throws IOException, JSONException;
    List<News> getNews(Integer id);
    void deleteNews(Long id);
}
