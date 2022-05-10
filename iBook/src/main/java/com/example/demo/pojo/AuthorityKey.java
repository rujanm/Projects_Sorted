package com.example.demo.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Embeddable
public class AuthorityKey implements Serializable {

	@ManyToOne
	@JoinColumn(name="username", nullable = false)
	private User user;
	
	@Column(name="authority")
	private String authority;
	
	

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}
	
}
