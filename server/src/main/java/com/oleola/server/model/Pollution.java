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
@Table(name = "pollution")
@EntityListeners(AuditingEntityListener.class)
public class Pollution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id", nullable = false)
    private Integer id_user;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "pollution", nullable = false)
    private String pollution;

    @Column(name = "danger", nullable = false)
    private String danger;

}
