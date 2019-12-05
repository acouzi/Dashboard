package com.oleola.server.service;

import com.oleola.server.model.Pollution;
import org.json.JSONException;

import java.io.IOException;
import java.util.List;

public interface IPollutionService {
    List<Pollution> findAll();
    List<Pollution> findMyPollution(Integer id);
    String fetchPollution(String city) throws IOException, JSONException;
    Pollution createPollution(String city, Integer user_id) throws IOException, JSONException;
    void deleteMyPollution(Long id);
    void changeMyPollution(String city, Long id) throws IOException, JSONException;
    void updateAllPollutions() throws IOException, JSONException;
}
