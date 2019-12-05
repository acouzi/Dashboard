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
@Table(name = "youtube")
@EntityListeners(AuditingEntityListener.class)
public class Youtube {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id", nullable = false)
    private Integer id_user;

    @Column(name = "channel_name", nullable = false)
    private String channel_name;

    @Column(name = "nbr_subs", nullable = false)
    private String nbr_subs;

    @Column(name = "img", nullable = false)
    private String img;
}
