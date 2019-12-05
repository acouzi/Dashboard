package com.oleola.server.repository;

import com.oleola.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where u.mail like %?1")
    User findUserByMail(String mail);

    @Query("select u from User u where u.password IS NOT NULL AND u.password = crypt(?1, u.password)")
    User checkPassword(String password);

    @Modifying
    @Transactional
    @Query(value = "Update Users SET services=:services WHERE id=:id", nativeQuery = true)
    void changeServicesById(@Param("services") String services, @Param("id") Long id);
}
