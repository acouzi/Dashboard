package com.oleola.server.service;

import com.oleola.server.model.Steam;
import com.oleola.server.model.Weather;
import com.oleola.server.repository.SteamRepository;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SteamService implements ISteamService {

    CloseableHttpClient httpclient = HttpClients.createDefault();

    @Autowired
    private SteamRepository repository;

    @Override
    public List<Steam> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Steam> findMyGamesByUserId(String user_id) {
        return repository.findAllMyGames(Integer.parseInt(user_id));
    }

    @Override
    public String fetchNumberPlayers(String game_id) throws IOException, JSONException {
        HttpGet httpget = new HttpGet(
                "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?format=json&appid=" + game_id);
        HttpResponse httpresponse = httpclient.execute(httpget);
        String json = EntityUtils.toString(httpresponse.getEntity());
        JSONObject jsonObject = new JSONObject(json);
        JSONObject res = jsonObject.getJSONObject("response");
        String nbr = res.getString("player_count");
        return nbr;
    }

    @Override
    public Steam saveGame(String game_id, Integer user_id, String game) throws IOException, JSONException {
        Steam newGame = new Steam();
        String nbr_players = fetchNumberPlayers(game_id);

        newGame.setGame(game);
        newGame.setGame_id(game_id);
        newGame.setId_user(user_id);
        newGame.setNbr_player(nbr_players);
        return repository.save(newGame);
    }

    @Override
    public void deleteMyGame(String id) {
        repository.deleteById(Long.parseLong(id));
    }

    @Override
    public void changeMyGame(String game, Long id, String game_id) throws IOException, JSONException {
        String nbr_players = fetchNumberPlayers(game_id);
        repository.changeGame(game, id, game_id, nbr_players);
    }

    @Override
    public void updateAllGames() throws IOException, JSONException {
        List<Steam> steam = repository.findAll();

        for (Steam w : steam) {
            changeMyGame(w.getGame(), w.getId(), w.getGame_id());
        }
    }
}
