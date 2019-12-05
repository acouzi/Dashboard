package com.oleola.server.controller;

import com.oleola.server.model.Trade;
import com.oleola.server.service.ITradeService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
public class TradeController {

    @Autowired
    private ITradeService tradeService;

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/saveTrade", method = RequestMethod.POST, produces = "application/json")
    public Trade createTrade(@RequestBody LinkedHashMap<String, String> map) throws IOException, InterruptedException, JSONException {
        String symbol = map.get("symbol");
        String user_id = map.get("user_id");

        return tradeService.createTrade(symbol, Integer.parseInt(user_id));
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/changeMyTrade", method = RequestMethod.PUT, produces = "application/json")
    public void changeMyTrade(@RequestBody LinkedHashMap<String, String> map) throws IOException, InterruptedException, JSONException {
        String symbol = map.get("symbol");
        String id = map.get("id");

        tradeService.changeMyTrade(symbol, Long.parseLong(id));
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/findMyTrade", method = RequestMethod.GET, produces = "application/json")
    public List<Trade> findMyTrade(@RequestParam String id) {
        return tradeService.findMyTrade(Integer.parseInt(id));
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/deleteMyTrade", method = RequestMethod.DELETE, produces = "application/json")
    public void deleteMyTrade(@RequestParam String id) {
        tradeService.deleteMyTrade(Long.parseLong(id));
    }
}
