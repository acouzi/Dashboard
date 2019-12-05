package com.oleola.server.controller;

import com.oleola.server.model.News;
import com.oleola.server.service.INewsService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
public class NewsController {

    @Autowired
    private INewsService newsService;

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/createNews", method = RequestMethod.POST, produces = "application/json")
    public void saveGame(@RequestBody LinkedHashMap<String, String> news) throws IOException, InterruptedException, JSONException {
        String category = news.get("category");
        String language = news.get("language");
        String user_id = news.get("user_id");
        newsService.createNews(category, language, Integer.parseInt(user_id));
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/getNews", method = RequestMethod.GET, produces = "application/json")
    public List<News> getNews(@RequestParam String id) throws IOException, InterruptedException, JSONException {
        return newsService.getNews(Integer.parseInt(id));
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/deleteNews", method = RequestMethod.DELETE, produces = "application/json")
    public void deleteNews(@RequestParam String id) throws IOException, InterruptedException, JSONException {
        newsService.deleteNews(Long.parseLong(id));
    }
}
