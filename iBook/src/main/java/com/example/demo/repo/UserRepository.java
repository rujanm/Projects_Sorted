package com.example.demo.repo;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.demo.pojo.User;

public interface UserRepository extends PagingAndSortingRepository<User, Integer>{

	public List<User> findAll();

	public User findFirstByUsername(String name);
}



