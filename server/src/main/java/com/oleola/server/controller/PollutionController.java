package com.oleola.server.controller;

import com.oleola.server.model.Pollution;
import com.oleola.server.service.INewsService;
import com.oleola.server.service.IPollutionService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
public class PollutionController {

    @Autowired
    private IPollutionService pollutionService;

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/savePollution", method = RequestMethod.POST, produces = "application/json")
    public Pollution saveWeather(@RequestBody LinkedHashMap<String, String> pollution) throws IOException, InterruptedException, JSONException {
        String city = pollution.get("city");
        String user_id = pollution.get("user_id");

        return pollutionService.createPollution(city, Integer.parseInt(user_id));
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/getMyPollution", method = RequestMethod.GET, produces = "application/json")
    public List<Pollution> getMyPollution(@RequestParam String user_id) throws IOException, InterruptedException, JSONException {
        return pollutionService.findMyPollution(Integer.parseInt(user_id));
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/deleteMyPollution", method = RequestMethod.DELETE, produces = "application/json")
    public void deleteMyPollution(@RequestParam String id) throws IOException, InterruptedException, JSONException {
        pollutionService.deleteMyPollution(Long.parseLong(id));
    }


    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/changeMyPollution", method = RequestMethod.PUT, produces = "application/json")
    public void changeMyPollution(@RequestParam String city, String id) throws IOException, InterruptedException, JSONException {
        pollutionService.changeMyPollution(city, Long.parseLong(id));
    }
}
