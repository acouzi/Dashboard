package com.oleola.server.repository;

import com.oleola.server.model.Pollution;
import com.oleola.server.model.Steam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PollutionRepository extends JpaRepository<Pollution, Long> {
    @Query(value = "select * from Pollution where user_id = ?1", nativeQuery = true)
    List<Pollution> findAllMyPollutions(Integer id);

    @Modifying
    @Transactional
    @Query(value = "Update Pollution SET city=:city, pollution=:pollution, danger=:danger WHERE id=:id", nativeQuery = true)
    void changeMyPollution(@Param("city")String city, @Param("id") Long id, @Param("pollution") String pollution, @Param("danger") String danger);
}
