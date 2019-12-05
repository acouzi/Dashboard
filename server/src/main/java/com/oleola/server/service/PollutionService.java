package com.oleola.server.service;

import com.oleola.server.model.Pollution;
import com.oleola.server.repository.PollutionRepository;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.tomcat.jni.Poll;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PollutionService implements IPollutionService {

    CloseableHttpClient httpclient = HttpClients.createDefault();

    @Autowired
    private PollutionRepository repository;

    @Override
    public List<Pollution> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Pollution> findMyPollution(Integer id) {
        return repository.findAllMyPollutions(id);
    }

    @Override
    public String fetchPollution(String city) throws IOException, JSONException {
        city = city.replaceAll(" ", "%20");

        HttpGet httpget = new HttpGet(
                "https://api.waqi.info/search/?token=ec9f2dbbfb5eca6849644a6db63222be20ca8bf9&keyword=" + city);
        HttpResponse httpresponse = httpclient.execute(httpget);
        String json = EntityUtils.toString(httpresponse.getEntity());
        JSONObject jsonObject = new JSONObject(json);
        JSONArray arr = (JSONArray) jsonObject.get("data");
        JSONObject one = arr.getJSONObject(0);

        return one.getString(("aqi"));
    }

    @Override
    public Pollution createPollution(String city, Integer user_id) throws IOException, JSONException {

        Pollution pol = new Pollution();
        String pollution = fetchPollution(city);
        String danger = setDanger(pollution);
        pol.setCity(city);
        pol.setId_user(user_id);
        pol.setPollution(pollution);
        pol.setDanger(danger);

        return repository.save(pol);
    }

    @Override
    public void deleteMyPollution(Long id) {
        repository.deleteById(id);
    }

    private String setDanger(String pollution) {
        String danger = "";

        if (Integer.parseInt(pollution) <= 50)
            danger = "Good";
        else if (Integer.parseInt(pollution) <= 100 && Integer.parseInt(pollution) > 50)
            danger = "Moderate";
        else if (Integer.parseInt(pollution) <= 150 && Integer.parseInt(pollution) > 100)
            danger = "Unhealthy for Sensitive Groups";
        else if (Integer.parseInt(pollution) <= 200 && Integer.parseInt(pollution) > 150)
            danger = "Unhealthy";
        else if (Integer.parseInt(pollution) <= 300 && Integer.parseInt(pollution) > 200)
            danger = "Very Unhealthy";
        else
            danger = "Hazardous";

        return danger;
    }

    @Override
    public void changeMyPollution(String city, Long id) throws IOException, JSONException {
        String pollution = fetchPollution(city);
        String danger = setDanger(pollution);

        repository.changeMyPollution(city, id, pollution, danger);
    }

    @Override
    public void updateAllPollutions() throws IOException, JSONException {
        List<Pollution> pollution = repository.findAll();

        for (Pollution e : pollution) {
            changeMyPollution(e.getCity(), e.getId());
        }
    }
}
