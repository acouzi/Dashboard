package com.oleola.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "steam")
@EntityListeners(AuditingEntityListener.class)
public class Steam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id", nullable = false)
    private Integer id_user;

    @Column(name = "game_id", nullable = false)
    private String game_id;

    @Column(name = "game", nullable = false)
    private String game;

    @Column(name = "nbr_player", nullable = false)
    private String nbr_player;
}

