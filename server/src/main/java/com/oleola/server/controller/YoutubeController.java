package com.oleola.server.controller;

import com.oleola.server.model.Youtube;
import com.oleola.server.service.IYoutubeService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
public class YoutubeController {

    @Autowired
    private IYoutubeService youtubeService;

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/saveChannel", method = RequestMethod.POST, produces = "application/json")
    public Youtube saveChannel(@RequestBody LinkedHashMap<String, String> channel) throws IOException, InterruptedException, JSONException {
        String name = channel.get("channel");
        String user_id = channel.get("id");

        return youtubeService.saveChannel(name, Integer.parseInt(user_id));
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/fetch", method = RequestMethod.GET, produces = "application/json")
    public void fetch() throws IOException, JSONException {
        youtubeService.fetchIdChannel("PewDiePie");
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/fetchMyChannels", method = RequestMethod.GET, produces = "application/json")
    public List<Youtube> fetchMyChannels(@RequestParam String user_id) throws IOException, JSONException {
        return youtubeService.fetchMyChannels(Integer.parseInt(user_id));
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/deleteMyChannel", method = RequestMethod.DELETE, produces = "application/json")
    public void deleteMyGame(@RequestParam String id) {
        youtubeService.deleteMyChannel(id);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/changeMyChannel", method = RequestMethod.PUT, produces = "application/json")
    public void changeMyChannel(@RequestBody LinkedHashMap<String, String> map) throws IOException, JSONException {
        String channel = map.get("channel");
        String id = map.get("id");
        youtubeService.changeMyChannel(channel, id);
    }
}
