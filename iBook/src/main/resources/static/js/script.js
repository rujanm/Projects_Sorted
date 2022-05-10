$(function() {
	var offset = 0;
	var limit = 4;
	var ajaxDone = true;
	var morePages = true;
	var editId = 0;

	
	$(window).scroll(scrolled);
	$("#add-post").click(showAddPost);
	$("#cancel-post-button").click(removeAddPost);
	$("#save-post-button").click(savePosts);
	$("#delete-post-button").click(deletePost);
	$("#search").bind("search", searchKey);
	$("main").on("click", ".editbale", showEditPost);
	$("main").on("click", ".comment-count", getComments);
	
	
	
	getPosts();
	
	
	
	function getComments() {
	var postId = $(this).parent().parent().find(".editbale").data("id");
	var $commentTemplate = $(this).parent().parent().find(".comment-template");
	console.log("the postId is: " + postId);
		$.ajax({
			url: "/get-comments",
			method: "GET",
			type: "json",
			data: {
				postId: $(this).parent().parent().find(".editbale").data("id")
			},
			error: ajaxError,
			success: function(data) {
				console.log(data);
				buildComments(data, $commentTemplate);
			}
		});
		return false;
	}
	
	
	
	function buildComments(data, $commentTemplate) {
		$(".comment").remove();
		for (var i = 0; i < data.length; i++) {
			var $comment = $commentTemplate.clone();
			$comment.removeClass("comment-template");
			$comment.addClass("comment");
			$comment.find(".comment-text").append(data[i].text);
			$comment.find(".comment-date").append("Posted " 
				+ jQuery.timeago(data[i].date));
			$commentTemplate.parent().append($comment);	
		}
	}
	
	
	
	function scrolled() {
		if (ajaxDone && morePages) {
			var top = $(this).scrollTop();
			var size = $("body").height();
			var height = $(this).height();
			if (top >= size - height) {
				offset += limit;
				console.log(offset);
				getPosts();	
			}
		}
	}
	
	
	function searchKey() {
		offset = 0;
		ajaxDone = false;
		$.ajax({
			url: "/search-posts",
			method: "GET",
			type: "JSON",
			data: {
				content: $("#search").val(),
				limit: limit,
				offset : offset
			},
			error: function() {
				ajaxDone = true;
				ajaxError();
			},
			success: function(data) {
				ajaxDone = true;
				if (data.length < limit) {
					morePages = false;
				}
				morePages = true;
				showSearchResults(data);
			}
		});
	}
	
	
	function showSearchResults(data) {
		offset = 0;
		$(".post").remove();
		buildPosts(data);
	}
	

	function deletePost() {
	console.log("the post id to delete is: " + editId);
		$.ajax({
			url: "/delete-post",
			method: "GET",
			type: "json",
			data: {
				id: editId
			},
			error: ajaxError,
			success: function() {
				reloadPosts();
				console.log("edit id has been reset to: " + editId);
			}
		});
	}
	
	
	function showEditPost() {
		$("#delete-post-button").show();
		var text = $(this).parent().parent().find(".post-content").text();
		$("#create-post-popup textarea").val(text);
		$("#create-post-popup").addClass("show-add-popup");
		$("main").addClass("main-add-popup");
		var id = $(this).data("id");
		editId = id;
	}
	

	function reloadPosts() {
		editId = 0;
		$(".post").remove();
		getPosts();
	}
	
	
	function savePosts() {
	console.log("id: " + editId);
		$.ajax({
			url: "/save-post",
			method: "POST",
			type: "json",
			data: {
				content: $("#create-post-popup textarea").val(),
				id:  editId
			},
			error: ajaxError,
			success: function(data) {
				console.log(data);
				reloadPosts();
			}
		});
	}
	
	
	function ajaxError() {
		alert("Ajax Error");
	}

	function showAddPost() {
		$("#create-post-popup").addClass("show-add-popup");
		$("main").addClass("main-add-popup");
		$("#delete-post-button").hide();
	}
	
	function removeAddPost() {
		$("#create-post-popup").removeClass("show-add-popup");
		$("main").removeClass("main-add-popup");
	}


	function getPosts() {
		ajaxDone = false;
		$.ajax({
			url: "/get-posts",
			method: "GET",
			type: "json",
			data: {
				limit: limit,
				offset: offset
			},
			error: function() {
				ajaxDone = true;
				ajaxError();
			},
			success: function(data) {
				ajaxDone = true;
				if (data.length < limit) {
					morePages = false;
				}
				buildPosts(data);
			}
		});
	}

	
	
	
	
	function buildPosts(data) {
		console.log(data);
		
		for (var i = 0; i < data.length; i++) {
			var $post = $("#post-template").clone();
			$post.removeAttr("id");
			$post.addClass("post");
			$post.find(".username").append(data[i].user.username);
			if (!data[i].editable) {
				$post.find(".editbale").hide();
			}
			$post.find(".post-content").append(data[i].content);
			$post.find(".comment-count").append(data[i].commentCount);
			$post.find(".post-date").append("Posted " + jQuery.timeago(data[i].date));
			$post.find(".editbale").data("id", data[i].id);
			$("main").append($post);
		}
	}







});