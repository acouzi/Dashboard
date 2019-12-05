package com.oleola.server.service;

import com.oleola.server.model.Trade;
import com.oleola.server.repository.TradeRepository;
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

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TradeService implements ITradeService {
    CloseableHttpClient httpclient = HttpClients.createDefault();

    @Autowired
    private TradeRepository repository;

    @Override
    public List<Trade> findAll() {
        return repository.findAll();
    }

    private Trade fetchInfo(String symbol, Integer user_id) throws JSONException, IOException {
        Trade tr = new Trade();
        HttpGet httpget = new HttpGet(
                "https://api.worldtradingdata.com/api/v1/stock?symbol=" + symbol + "&api_token=3ZVkqT8RmVE0TrnrdKlHHGklwdKcuHrQPKwqYD7zoxx8sRwxwNkyR5FnURWl");
        HttpResponse httpresponse = httpclient.execute(httpget);
        String json = EntityUtils.toString(httpresponse.getEntity());
        JSONObject jsonObject = new JSONObject(json);
        JSONArray arr = jsonObject.getJSONArray("data");
        JSONObject one = arr.getJSONObject(0);

        tr.setCurrency(one.getString("currency"));
        tr.setDay_high(one.getString("day_high"));
        tr.setDay_low(one.getString("day_low"));
        tr.setPrice(one.getString("price"));
        tr.setName(one.getString("name"));
        tr.setSymbol(symbol);
        tr.setId_user(user_id);
        tr.setVolume(one.getString("volume"));
        tr.setStock_exchange(one.getString("stock_exchange_long"));
        return tr;
    }

    @Override
    public Trade createTrade(String symbol, Integer user_id) throws IOException, JSONException {
        return repository.save(fetchInfo(symbol, user_id));
    }

    @Override
    public List<Trade> findMyTrade(Integer id) {
        return repository.findAllMyTrade(id);
    }

    @Override
    public void deleteMyTrade(Long id) {
        System.out.println(id);
        repository.deleteById(id);
    }

    @Override
    public void changeMyTrade(String symbol, Long id) throws IOException, JSONException {
        Trade n = fetchInfo(symbol, 2);
        repository.changeMyTrade(symbol, id, n.getName(), n.getCurrency(), n.getDay_high(), n.getDay_low(), n.getVolume(), n.getStock_exchange());
    }

    @Override
    public void updateAllTrades() throws IOException, JSONException {
        List<Trade> list = findAll();

        for (Trade e: list)
            changeMyTrade(e.getSymbol(), e.getId());
    }
}
