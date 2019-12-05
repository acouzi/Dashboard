package com.oleola.server.service;

import com.oleola.server.model.Youtube;
import com.oleola.server.repository.YoutubeRepository;
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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
public class YoutubeService implements IYoutubeService {

    @Autowired
    private YoutubeRepository repository;

    CloseableHttpClient httpclient = HttpClients.createDefault();

    @Override
    public List<Youtube> findAll() { return repository.findAll(); }


    public String fetchIdChannel(String channel) throws IOException, JSONException {
        HttpGet httpget = new HttpGet(
                "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyCItq7EA2KhB3lHC6Taghgm16Gg-LCn_w8&forUsername=" + channel + "&part=id");
        HttpResponse httpresponse = httpclient.execute(httpget);
        String json = EntityUtils.toString(httpresponse.getEntity());
        JSONObject jo = new JSONObject(json);
        
        JSONArray arr = (JSONArray) jo.get("items");
        JSONObject one = arr.getJSONObject(0);

        return one.getString("id");
    }

    public String fetchNbrSubs(String id) throws IOException, JSONException {
        HttpGet httpget = new HttpGet(
                "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + id + "&key=AIzaSyCItq7EA2KhB3lHC6Taghgm16Gg-LCn_w8");
        HttpResponse httpresponse = httpclient.execute(httpget);
        String json = EntityUtils.toString(httpresponse.getEntity());
        JSONObject jo = new JSONObject(json);
        JSONArray arr = (JSONArray) jo.get("items");
        JSONObject one = arr.getJSONObject(0);
        JSONObject stats = one.getJSONObject("statistics");

        return stats.getString("subscriberCount");
    }

    public String getThumbnail(String id) throws IOException, JSONException {
        HttpGet httpget = new HttpGet(
                "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + id +"&fields=items%2Fsnippet%2Fthumbnails&key=AIzaSyCItq7EA2KhB3lHC6Taghgm16Gg-LCn_w8");
        HttpResponse httpresponse = httpclient.execute(httpget);
        String json = EntityUtils.toString(httpresponse.getEntity());
        JSONObject jo = new JSONObject(json);
        JSONArray arr = (JSONArray) jo.get("items");
        JSONObject one = arr.getJSONObject(0);
        JSONObject snippet = one.getJSONObject("snippet");
        JSONObject thumbnails = snippet.getJSONObject("thumbnails");
        JSONObject high = thumbnails.getJSONObject("high");

        return high.getString("url");

    }

    @Override
    public String[] getInfoChannel(String channel) throws IOException, JSONException {

        return null;
    }

    @Override
    public Youtube saveChannel(String channel, Integer user_id) throws IOException, JSONException {
        Youtube y = new Youtube();
        String id = fetchIdChannel(channel);

        y.setChannel_name(channel);
        y.setId_user(user_id);
        y.setNbr_subs(fetchNbrSubs(id));
        y.setImg(getThumbnail(id));
        return repository.save(y);
    }

    @Override
    public List<Youtube> fetchMyChannels(Integer id) {
        return repository.fetchMyChannels(id);
    }

    @Override
    public void deleteMyChannel(String id) {
        repository.deleteById(Long.parseLong(id));
    }

    @Override
    public void changeMyChannel(String channel, String idRecord) throws IOException, JSONException {
        String id = fetchIdChannel(channel);
        String nbr = fetchNbrSubs(id);
        String img = getThumbnail(id);

        repository.changeMyChannel(channel, nbr, Long.parseLong(idRecord), img);

    }

    @Override
    public void UpdateAllChannels() throws IOException, JSONException {
        List<Youtube> youtube = repository.findAll();

        for (Youtube y : youtube) {
            changeMyChannel(y.getChannel_name(), String.valueOf(y.getId()));
        }
    }
}
