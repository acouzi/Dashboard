package com.oleola.server.service;

import com.oleola.server.model.Youtube;
import org.json.JSONException;

import java.io.IOException;
import java.util.List;

public interface IYoutubeService {
    List<Youtube> findAll();
    Youtube saveChannel(String channel, Integer user_id) throws IOException, JSONException;
    String[] getInfoChannel(String channel) throws IOException, JSONException;
    String fetchIdChannel(String channel) throws IOException, JSONException;
    List<Youtube> fetchMyChannels(Integer id);
    void deleteMyChannel(String id);
    public void changeMyChannel(String channel, String id) throws IOException, JSONException;
    public void UpdateAllChannels() throws IOException, JSONException;
}
