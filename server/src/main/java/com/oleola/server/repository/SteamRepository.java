package com.oleola.server.repository;

import com.oleola.server.model.Steam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface SteamRepository extends JpaRepository<Steam, Long> {

    @Query(value = "select * from Steam where user_id = ?1", nativeQuery = true)
    List<Steam> findAllMyGames(Integer id);

    @Modifying
    @Transactional
    @Query(value = "Update Steam SET game=:game, game_id=:game_id, nbr_player=:nbr_players WHERE id=:id", nativeQuery = true)
    void changeGame(@Param("game")String game, @Param("id") Long id, @Param("game_id") String game_id, @Param("nbr_players") String nbr_players);
}
