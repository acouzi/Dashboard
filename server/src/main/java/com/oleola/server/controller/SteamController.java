package com.oleola.server.controller;

import com.oleola.server.model.Steam;
import com.oleola.server.service.ISteamService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
public class SteamController {

    @Autowired
    private ISteamService steamService;

    @GetMapping("/showSteam")
    public List<Steam> findUsers() {
        return steamService.findAll();
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/saveGame", method = RequestMethod.POST, produces = "application/json")
    public Steam saveGame(@RequestBody LinkedHashMap<String, String> game) throws IOException, InterruptedException, JSONException {
        String game_id = game.get("game_id");
        String game_name = game.get("game");
        String user_id = game.get("user_id");
        return steamService.saveGame(game_id, Integer.parseInt(user_id), game_name);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/findMyGames", method = RequestMethod.GET, produces = "application/json")
    public List<Steam> findMyGames(@RequestParam String user_id) {
        return steamService.findMyGamesByUserId(user_id);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/deleteMyGame", method = RequestMethod.DELETE, produces = "application/json")
    public void deleteMyGame(@RequestParam String id) {
        steamService.deleteMyGame(id);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/changeMyGame", method = RequestMethod.PUT, produces = "application/json")
    public ResponseEntity changeGame(@RequestBody LinkedHashMap<String, String> game) throws IOException, InterruptedException, JSONException {
        String game_name = game.get("game");
        String game_id = game.get("id_game");
        String id = game.get("id");

        steamService.changeMyGame(game_name, Long.parseLong(id), game_id);
        return ResponseEntity.ok().build();
    }
}
