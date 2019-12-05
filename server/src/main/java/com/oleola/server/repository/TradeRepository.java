package com.oleola.server.repository;

import com.oleola.server.model.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {

    @Query(value = "select * from Trade where user_id = ?1", nativeQuery = true)
    List<Trade> findAllMyTrade(Integer id);

    @Modifying
    @Transactional
    @Query(value = "Update Trade SET symbol=:symbol, name=:name, day_high=:day_high, currency=:currency, day_low=:day_low, volume=:volume, stock_exchange=:stock_exchange WHERE id=:id", nativeQuery = true)
    void changeMyTrade(@Param("symbol")String symbol, @Param("id") Long id, @Param("name") String name, @Param("currency") String currency, @Param("day_high") String day_high, @Param("day_low") String day_low, @Param("volume") String volume, @Param("stock_exchange") String stock_exchange);
}
