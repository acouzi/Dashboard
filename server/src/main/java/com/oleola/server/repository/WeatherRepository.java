package com.oleola.server.repository;

import com.oleola.server.model.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface WeatherRepository extends JpaRepository<Weather, Long> {

    @Query(value = "select * from Weather where user_id = ?1", nativeQuery = true)
    List<Weather> findAllMyWeather(Integer id);

    @Modifying
    @Transactional
    @Query(value = "Update Weather SET city=:city, type=:type, temperature=:temp WHERE id=:id", nativeQuery = true)
    void changeById(@Param("city") String city, @Param("id") Long id, @Param("type") String type, @Param("temp") String temp);
}