package com.oleola.server.service;

import com.oleola.server.model.Steam;
import org.json.JSONException;

import java.io.IOException;
import java.util.List;

public interface ISteamService {
    List<Steam> findAll();
    Steam saveGame(String game_id, Integer user_id, String game) throws IOException, JSONException;
    String fetchNumberPlayers(String game_id) throws IOException, JSONException;
    List<Steam> findMyGamesByUserId(String user_id);
    void deleteMyGame(String id);
    void changeMyGame(String game, Long id, String game_id) throws IOException, JSONException;
    void updateAllGames() throws IOException, JSONException;
}
