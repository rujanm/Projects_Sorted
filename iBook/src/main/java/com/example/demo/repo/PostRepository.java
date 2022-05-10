package com.example.demo.repo;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.demo.pojo.Post;

public interface PostRepository extends PagingAndSortingRepository<Post,Integer> {

	public List<Post> findAllByOrderByDateDesc(Pageable page);

	public List<Post> findAllByContentContainingOrderByDateDesc(String content, Pageable page);
	
}
