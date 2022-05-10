$(function() {
	var offset = 0;
	var limit = 25;
	var page;

	$("#search").keypress(keywordSearch);
	$("#pages").on("click", "a", changePage);
	$("#next-btn").click(nextPage);
	$("#prev-btn").click(prevPage);
	
	function nextPage() {
		//offset = offset + limit;
		offset += limit;
		var term = $("#search").val();
		getBusinesses(term, offset, limit);
	}
	
	function prevPage() {
		//offset = offset - limit;
		offset -= limit;
		var term = $("#search").val();
		getBusinesses(term, offset, limit);
	}
	
	function changePage() {
		offset = parseInt($(this).attr("href"));
		console.log(offset);
		
		var term = $("#search").val();
		getBusinesses(term, offset, limit);
		return false;
	}
	
	function buildPages(total) {
		var numPages = 0;
		
		if (total % limit == 0) {
			numPages = Math.floor(total / limit);
		} else {
			numPages = Math.floor(total / limit) + 1;
		}
		
		$("#pages").empty();
		for (var i = 1; i <= numPages; i++) {
			var $a = $("<a/>");
			$a.text(i);
			$a.attr("href", (i - 1) * limit);
			$("#pages").append($a);
		}
		
	}
	
	function getBusinessReviews(id) {
		
		$.ajax({
			url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id+"/reviews",
			headers: {
				Authorization: "Bearer JcLsY02vCqvKgLUSj0-TzeGwz6QOUVrLFR4YQnZsGPWXNGvR3zuaXliSh0GL-_xjPJau11k8rIQei0-lmCzqv1Ze9oRkYnzP0YDr5bmDd1zwBTLiDMjPksDhgS5oX3Yx"
			},
			method: "GET",
			dataType: "json",
			data: {
			
			},
			error: ajaxError,
			success: function(data) {
				console.log(data);
				console.log(data.reviews[1].text);
				console.log(data.reviews[1].user);
			}
		});
	}
	
	// get single info on a single Business 
	function getBusiness(id) {
		
		$.ajax({
			url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id,
			headers: {
				Authorization: "Bearer JcLsY02vCqvKgLUSj0-TzeGwz6QOUVrLFR4YQnZsGPWXNGvR3zuaXliSh0GL-_xjPJau11k8rIQei0-lmCzqv1Ze9oRkYnzP0YDr5bmDd1zwBTLiDMjPksDhgS5oX3Yx"
			},
			method: "GET",
			dataType: "json",
			data: {
			
			},
			error: ajaxError,
			success: function(data) {
				console.log(data);
			}
		});	
	}
	
	function keywordSearch(event) {
		if (event.which == 13) {
			offset = 0;
			var keyword = $(this).val();			
			getBusinesses(keyword, offset, limit);
		}
	}

	function getBusinesses(keyword, offset, limit) {
			
			$.ajax({
				url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search",
				headers: {
					Authorization: "Bearer JcLsY02vCqvKgLUSj0-TzeGwz6QOUVrLFR4YQnZsGPWXNGvR3zuaXliSh0GL-_xjPJau11k8rIQei0-lmCzqv1Ze9oRkYnzP0YDr5bmDd1zwBTLiDMjPksDhgS5oX3Yx"
				},
				method: "GET",
				dataType: "json",
				data: {
					term: keyword,
					offset: offset,
					limit: limit,
					
					location: "Omaha"
				}, 
				error: ajaxError,
				success: function(data) {
					console.log(data);
					
					if (offset + limit < data.total) {
						$("#next-btn").addClass("show");
					} else {
						$("#next-btn").removeClass("show");
					}
					
					if (offset == 0) {
						$("#prev-btn").removeClass("show");
					} else {
						$("#prev-btn").addClass("show");
					}
					
					buildBusinesses(data);
					buildPages(data.total);
				}
			});
	}
	
	
	function ajaxError() {
		alert("Ajax Error!");
	}
	
	
	function buildBusinesses(data) {

		$(".card").remove();		
		for (var i = 0; i < data.businesses.length; i++) {
			
			var $bus = data.businesses[i];
			var $business = $("#business-card").clone();
			$business.removeAttr("id");
			$business.addClass("card");
			$business.find(".business-title").append($bus.name);
			$business.find(".business-rating").append($bus.rating);
			$business.find(".review-count").append($bus.review_count);
			
			var numStars = Math.floor($bus.rating);
			for (var ri = 1; ri <= numStars; ri++) {
				$business.find("img:nth-child(" + ri + ")").attr(
				"src", "images/star-filled.png");
			}
			var numStarsString = "" + $bus.rating;
			if (numStarsString.endsWith(".5")) {
				$business.find("img:nth-child(" + (numStars + 1) + ")").attr(
				"src", "images/star-half.png");
			}
			 
			$business.find(".business-image img").attr("src", $bus.image_url);
			$("#businesses").append($business);
		}
		
	}
	
	
	
	
	
	

























});