package com.example.demo.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.pojo.Comment;
import com.example.demo.pojo.Post;
import com.example.demo.pojo.User;
import com.example.demo.repo.CommentRepository;
import com.example.demo.repo.PostRepository;
import com.example.demo.repo.UserRepository;

@RestController
public class PostController {
	private PostRepository repo;
	private CommentRepository commentRepo;
	private UserRepository userRepo;

	@Autowired
	public PostController(
			PostRepository repo, 
			UserRepository userRepo, 
			CommentRepository commentRepo) {
		this.repo = repo;
		this.userRepo = userRepo;
		this.commentRepo = commentRepo;
	}
	
	
	@RequestMapping("/get-comments")
	public List<Comment> getComments(@RequestParam int postId) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		
		Post post = repo.findById(postId).get();
		
		List<Comment> comments = (List<Comment>) commentRepo.findAllByPostOrderByDateDesc(post);
		return comments;
	}
	

		
	
	@RequestMapping("/get-users")
	public List<User> getUsers() {
		
		List<User> users = (List<User>) userRepo.findAll();
		return users;
	}

	
	
	
	@RequestMapping("/get-posts")
	public List<Post> getPosts(
			@RequestParam int limit,
			@RequestParam int offset) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = userRepo.findFirstByUsername(name);
		Pageable page = PageRequest.of(offset/limit, limit);
		
		List<Post> posts = (List<Post>) repo.findAllByOrderByDateDesc(page);
		
		for (Post post: posts) {
			if (name.equals(post.getUser().getUsername())) {
				post.setEditable(true);
			}
		}
		return posts;
		
	}
	
	
	
	@RequestMapping("/search-posts")
	public List<Post> searchPosts(
			@RequestParam String content,
			@RequestParam int limit,
			@RequestParam int offset) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		Pageable page = PageRequest.of(offset/limit, limit);
		
		List<Post> posts = (List<Post>) repo.findAllByContentContainingOrderByDateDesc(content, page);
		
		for (Post post: posts) {
			if (name.equals(post.getUser().getUsername())) {
				post.setEditable(true);
			}
		}
		return posts;
	}
	
	
	
	@RequestMapping("/save-post")
	public Post savePost(
		@RequestParam String content,
		@RequestParam int id) {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = userRepo.findFirstByUsername(name);
		
		if (id > 0) {
			// existing post
			Post post = repo.findById(id).get();
			if (user.getUsername().equals(post.getUser().getUsername())) {
				post.setContent(content);
				post.setDate(new Date());
				post = repo.save(post);
				return post;
				}
			} else {
				// creating a new post
				Post post = new Post();
				post.setUser(user);
				post.setContent(content);
				post.setDate(new Date());
				post = repo.save(post);
				return post;
		}
		return null;
	}
	
	
	@RequestMapping("/delete-post")
	public void deletePost(@RequestParam int id) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = userRepo.findFirstByUsername(name);
		Post post = repo.findById(id).get();
		
		if (name.equals(post.getUser().getUsername())) {
			repo.delete(post);
		}
	}
	
	

}






