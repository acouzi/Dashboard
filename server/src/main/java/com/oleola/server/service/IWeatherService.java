package com.oleola.server.service;

import com.oleola.server.model.Weather;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;

public interface IWeatherService {
    List<Weather> findAll();
    JSONObject fetchWeather(String city) throws IOException, InterruptedException, JSONException;
    Weather saveWeather(String city, Integer user_id, String type) throws IOException, JSONException;
    List<Weather> findMyWeatherById(String user_id);
    void deleteById(Long id);
    void changeWeather(String city, Long id, String type) throws IOException, JSONException;
    void updateAllTemperature() throws IOException, JSONException;
}
