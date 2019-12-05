package com.oleola.server.controller;

import com.oleola.server.model.User;
import com.oleola.server.model.Weather;
import com.oleola.server.service.IWeatherService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
public class WeatherController {

    @Autowired
    private IWeatherService weatherService;


    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/saveWeather", method = RequestMethod.POST, produces = "application/json")
    public Weather saveWeather(@RequestBody LinkedHashMap<String, String> weather) throws IOException, InterruptedException, JSONException {
        String city = weather.get("city");
        String type = weather.get("type");
        String user_id = weather.get("user_id");

        return weatherService.saveWeather(city, Integer.parseInt(user_id), type);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/changeWeather", method = RequestMethod.PUT, produces = "application/json")
    public ResponseEntity changeWeather(@RequestBody LinkedHashMap<String, String> weather) throws IOException, InterruptedException, JSONException {
        String city = weather.get("city");
        String type = weather.get("type");
        String id = weather.get("id");

        System.out.println(city);
        System.out.println(type);
        System.out.println(id);
        weatherService.changeWeather(city, Long.parseLong(id), type);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/findMyWeather", method = RequestMethod.GET, produces = "application/json")
    public List<Weather> findMyWeather(@RequestParam String user_id) {
        return weatherService.findMyWeatherById(user_id);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/deleteMyWeather", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity deleteMyWeather(@RequestParam Integer id) {
        weatherService.deleteById((long)id);
        return ResponseEntity.ok().build();
    }
}
