package com.example.demo.repo;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.demo.pojo.Comment;
import com.example.demo.pojo.Post;

public interface CommentRepository extends PagingAndSortingRepository<Comment, Integer> {

	public List<Comment> findAllByPostOrderByDateDesc(Post post);

}
