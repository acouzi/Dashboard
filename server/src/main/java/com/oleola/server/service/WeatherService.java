package com.oleola.server.service;

import com.oleola.server.model.Weather;
import com.oleola.server.repository.WeatherRepository;
import lombok.RequiredArgsConstructor;
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

import javax.persistence.EntityManager;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


@Service
@RequiredArgsConstructor
public class WeatherService implements IWeatherService {

    @Autowired
    private WeatherRepository repository;

    CloseableHttpClient httpclient = HttpClients.createDefault();


    @Override
    public List<Weather> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Weather> findMyWeatherById(String user_id) {
       return repository.findAllMyWeather(Integer.parseInt(user_id));
    }


    @Override
    public JSONObject fetchWeather(String city) throws IOException, JSONException {
        city = city.replaceAll(" ", "%20");

        HttpGet httpget = new HttpGet(
                "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=499ec04de813f4e1c23b6c2340bf882e");
        HttpResponse httpresponse = httpclient.execute(httpget);
        String json = EntityUtils.toString(httpresponse.getEntity());
        JSONObject jsonObject = new JSONObject(json);
        JSONObject res = jsonObject.getJSONObject("main");

       return res;
    }

    @Override
    public Weather saveWeather(String city, Integer user_id, String type) throws IOException, JSONException {
        Weather weather = new Weather();
        JSONObject res = fetchWeather(city);
        String temp = res.getString("temp");
        if (type.equals("celsius"))
            temp = String.valueOf(Float.parseFloat(temp) - 273.5);
        else if (type.equals("fahrenheit"))
            temp = String.valueOf(Float.parseFloat(temp) * 9/5 - 459.67);
        weather.setCity(city);
        weather.setId_user(user_id);
        weather.setType(type);
        weather.setTemperature(temp);
        repository.save(weather);
        return weather;
    }

    @Override
    public void deleteById(Long id) {
         repository.deleteById(id);
    }
    
    @Override
    public void changeWeather(String city, Long id, String type) throws IOException, JSONException {
        JSONObject res = fetchWeather(city);
        String temp = res.getString("temp");
        if (type.equals("celsius"))
            temp = String.valueOf(Float.parseFloat(temp) - 273.5);
        else if (type.equals("fahrenheit"))
            temp = String.valueOf(Float.parseFloat(temp) * 9/5 - 459.67);
        repository.changeById(city, id, type, temp);
    }

    @Override
    public void updateAllTemperature() throws IOException, JSONException {
        List<Weather> weather = repository.findAll();

        for (Weather w : weather) {
            changeWeather(w.getCity(), w.getId(), w.getType());
        }
    }
}
