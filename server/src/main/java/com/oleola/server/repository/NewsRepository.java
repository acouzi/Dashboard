package com.oleola.server.repository;

import com.oleola.server.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {

    @Query(value = "select * from news n where n.user_id =:id", nativeQuery = true)
    List<News> fecthMyNews(@Param("id") Integer id);
}
