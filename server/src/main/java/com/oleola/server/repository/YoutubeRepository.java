package com.oleola.server.repository;
import com.oleola.server.service.IYoutubeService;
import com.oleola.server.service.IYoutubeService;

import com.oleola.server.model.Youtube;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface YoutubeRepository extends JpaRepository<Youtube, Long>  {

    @Query(value = "select * from youtube y where y.user_id =:id", nativeQuery = true)
    List<Youtube> fetchMyChannels(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "Update Youtube SET img=:img, channel_name=:channel, nbr_subs=:nbr WHERE id=:id", nativeQuery = true)
    void changeMyChannel(@Param("channel") String channel, @Param("nbr") String nbr, @Param("id") Long id, @Param("img") String img);
}
