package com.oleola.server.model;

import com.oleola.server.service.*;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;


@Component
public class ScheduleTasks {

    @Autowired
    private IWeatherService weatherService;

    @Autowired
    private ISteamService steamService;

    @Autowired
    private IYoutubeService youtubeService;

    @Autowired
    private IPollutionService pollutionService;

    @Autowired
    private ITradeService tradeService;

    @Scheduled(fixedRate = 300000)
    public void updateTemperature() throws IOException, JSONException {
        weatherService.updateAllTemperature();
        System.out.println("Updated every weather records");
    }

    @Scheduled(fixedRate = 60000)
    public void updateAllGames() throws IOException, JSONException {
        steamService.updateAllGames();
        System.out.println("Updated every games records");
    }

    @Scheduled(fixedRate = 120000)
    public void updateAllPollution() throws IOException, JSONException {
        pollutionService.updateAllPollutions();
        System.out.println("Updated every pollution records");
    }

    @Scheduled(fixedRate = 300000)
    public void updateAllChannels() throws IOException, JSONException {
        tradeService.updateAllTrades();
        System.out.println("Updated every trades records");

    }
}
