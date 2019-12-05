package com.oleola.server.service;

import com.oleola.server.model.Trade;
import org.json.JSONException;

import java.io.IOException;
import java.util.List;

public interface ITradeService {
    List<Trade> findAll();
    Trade createTrade(String symbol, Integer user_id) throws IOException, JSONException;
    void deleteMyTrade(Long id);
    List<Trade> findMyTrade(Integer id);
    void changeMyTrade(String symbol, Long id) throws IOException, JSONException;
    void updateAllTrades() throws IOException, JSONException;
}
