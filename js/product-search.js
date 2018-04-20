//product-search.js 

$(function () {
	// var SESSION_KEY = sessionStorage.getItem("session_key");
	// var tel = sessionStorage.getItem("mobile");
	var SESSION_KEY = "session_key";
	var tel = "mobile";
	var URL = "https://www.wanbaolife.com";

	show_and_hide = function(div_id) 
	{
		var show_status = document.getElementById(div_id).style.display;
		var href_id = div_id.replace("table", "arrow");
		var img_id = href_id + "_img";	
		if (show_status == "inline-block"){
			document.getElementById(img_id).src = "https://resource.wanbaolife.com/static/images/right-arrow.png";
			document.getElementById(div_id).style.display = "none";
		}
		else
		{
			document.getElementById(img_id).src = "https://resource.wanbaolife.com/static/images/down-arrow.png";
			document.getElementById(div_id).style.display = "inline-block";
		}
	}

	reset_all_filter = function()
	{
		$("#insurer_abbreviation option:first").prop("selected", "selected");
		$("#product_class option:first").prop("selected", "selected");
		$("#product_structure option:first").prop("selected", "selected");
		$("#filing_year option:first").prop("selected", "selected");
		$("#insurance_age_coverage option:first").prop("selected", "selected");
		$("#insurance_duration option:first").prop("selected", "selected");
		$("#target_audience option:first").prop("selected", "selected");
		$("#benefit_type option:first").prop("selected", "selected");
		$("#renshenzhuangtai option:first").prop("selected", "selected");
		update_search_result(1);	
	}

	function get_search_filter() 
	{
	   var url = URL + '/terms/get_search_filter';
	    $.post(url,
	    {
	        channel: 3,
	        session_key: SESSION_KEY
	    },
	    function (data, status)
	    {
	        //上市时间
        	var filter_html = '';
	        for (var i = 0; i < data.insurer_abbreviation.length; i++) 
	        {
	        	if (i == 0)
	        	{
	            	filter_html += "<option selected value='" + data.insurer_abbreviation[i][0] + "'>" + data.insurer_abbreviation[i][1] + "</option>";
	            }
	            else
	            {
	            	filter_html += "<option value='" + data.insurer_abbreviation[i][0] + "'>" + data.insurer_abbreviation[i][1] + "</option>";
	            }
	        }
	        $('#insurer_abbreviation').html(filter_html);

	        filter_html = '';
	        for (var i = 0; i < data.product_class.length; i++) 
	        {
	        	if (i == 0)
	        	{
	            	filter_html += "<option selected value='" + data.product_class[i][0] + "'>" + data.product_class[i][1] + "</option>";
	            }
	            else
	            {
	            	filter_html += "<option value='" + data.product_class[i][0] + "'>" + data.product_class[i][1] + "</option>";
	            }
	        }
	        $('#product_class').html(filter_html);

	        filter_html = '';
	        for (var i = 0; i < data.product_structure.length; i++) 
	        {
	        	if (i == 0)
	        	{
	            	filter_html += "<option selected value='" + data.product_structure[i][0] + "'>" + data.product_structure[i][1] + "</option>";
	            }
	            else
	            {
	            	filter_html += "<option value='" + data.product_structure[i][0] + "'>" + data.product_structure[i][1] + "</option>";
	            }
	        }
	        $('#product_structure').html(filter_html);

	        filter_html = '';
	        for (var i = 0; i < data.filing_year.length; i++) 
	        {
	        	if (i == 0)
	        	{
	            	filter_html += "<option selected value='" + data.filing_year[i] + "'>全部</option>";
	            }
	            else
	            {
	            	filter_html += "<option value='" + data.filing_year[i] + "'>" + data.filing_year[i] + "</option>";
	            }
	        }
	        $('#filing_year').html(filter_html);

	        filter_html = '';
	        for (var i = 0; i < data.insurance_age_coverage.length; i++) 
	        {
	        	if (i == 0)
	        	{
	            	filter_html += "<option selected value='" + data.insurance_age_coverage[i][0] + "'>" + data.insurance_age_coverage[i][1] + "</option>";
	            }
	            else
	            {
	            	filter_html += "<option value='" + data.insurance_age_coverage[i][0] + "'>" + data.insurance_age_coverage[i][1] + "</option>";
	            }
	        }
	        $('#insurance_age_coverage').html(filter_html);

	        filter_html = '';
	        for (var i = 0; i < data.insurance_duration.length; i++) 
	        {
	        	if (i == 0)
	        	{
	            	filter_html += "<option selected value='" + data.insurance_duration[i][0] + "'>" + data.insurance_duration[i][1] + "</option>";
	            }
	            else
	            {
	            	filter_html += "<option value='" + data.insurance_duration[i][0] + "'>" + data.insurance_duration[i][1] + "</option>";
	            }
	        }
	        $('#insurance_duration').html(filter_html);

	        filter_html = '';
	        for (var i = 0; i < data.target_audience.length; i++) 
	        {
	        	if (i == 0)
	        	{
	            	filter_html += "<option selected value='" + data.target_audience[i][0] + "'>" + data.target_audience[i][1] + "</option>";
	            }
	            else
	            {
	            	filter_html += "<option value='" + data.target_audience[i][0] + "'>" + data.target_audience[i][1] + "</option>";
	            }
	        }
	        $('#target_audience').html(filter_html);

	        filter_html = '';
	        for (var i = 0; i < data.benefit_type.length; i++) 
	        {
	        	if (i == 0)
	        	{
	            	filter_html += "<option selected value='" + data.benefit_type[i][0] + "'>" + data.benefit_type[i][1] + "</option>";
	            }
	            else
	            {
	            	filter_html += "<option value='" + data.benefit_type[i][0] + "'>" + data.benefit_type[i][1] + "</option>";
	            }
	        }
	        $('#benefit_type').html(filter_html);

	        filter_html = '';
	        for (var i = 0; i < data.renshenzhuangtai.length; i++) 
	        {
	        	if (i == 0)
	        	{
	            	filter_html += "<option selected value='" + data.renshenzhuangtai[i] + "'>全部</option>";
	            }
	            else
	            {
	            	filter_html += "<option value='" + data.renshenzhuangtai[i] + "'>" + data.renshenzhuangtai[i] + "</option>";
	            }
	        }
	        $('#renshenzhuangtai').html(filter_html);
	    });
	}

	function update_search_result(page_num)
	{
		var url = URL + "/terms/wbzx_product_search";
		var keyword = $("#keyword").val();
		var insurer_id = $("#insurer_abbreviation").val();
		var product_class = $("#product_class").val();
		var product_structure = $("#product_structure").val();
		var filing_year = $("#filing_year").val();
		var insurance_age_coverage = $("#insurance_age_coverage").val();
		var insurance_duration = $("#insurance_duration").val();
		var target_audience = $("#target_audience").val();
		var benefit_type = $("#benefit_type").val();
		var renshenzhuangtai = $("#renshenzhuangtai").val();
		
		$.post(url,
		{
			keyword: keyword,
			insurer_id: insurer_id,
			product_class: product_class,
			product_structure: product_structure,
			filing_year: filing_year,
			insurance_age_coverage: insurance_age_coverage,
			insurance_duration: insurance_duration,
			target_audience: target_audience,
			benefit_type: benefit_type,
			renshenzhuangtai: renshenzhuangtai,
			session_key: SESSION_KEY,
			page_num: page_num
		}, function(data, status)
		{
			if (data.total_product_count >= 0)
			{
	            var product_list = data.product_list;
	            var total_page_count = data.total_page_count;
	            var total_product_count = data.total_product_count;
	            var page_num = data.page_num;
	            $("#total_product_count").text(total_product_count);

	            // build product list
	            var inner_html = "";
	            for (var i = 0; i < product_list.length; i++)
            	{
               		var product_obj_html = '';
               		product_obj_html += '<div class="product clearfix">';
               		product_obj_html += '<div class="product-box">';
               		product_obj_html += '<div class="insurer-img"><img src="' + product_list[i].insurer_logo + '" width="72" height="72"></div>';
               		product_obj_html += '<div class="product-text">';
               		product_obj_html += '<h2><a target="_blank" href="goodsDetail.html?pid="' + product_list[i].pid + '">' + product_list[i].product + '</a></h2>';
               		product_obj_html += '<table><tbody><tr>';
               		product_obj_html += '<td>' + product_list[i].insurer_abbreviation + '</td>';
               		product_obj_html += '<td>' + product_list[i].product_class + '</td>';
               		product_obj_html += '<td>' + product_list[i].product_structure + '</td>';
               		product_obj_html += '<td class="tdyear">' + product_list[i].filing_year + '</td>';
               		product_obj_html += '</tr></tbody></table>';
               		product_obj_html += '</div>';
               		if (product_list[i].is_followed == 1)
               		{
               			product_obj_html += '<div class="favorite"><img class="rm-bookmark" pid="' + product_list[i].pid + '" src="https://resource.wanbaolife.com/static/images/star-solid.png" width="25" height="24"></div>';
               		}
               		else
               		{
               			product_obj_html += '<div class="favorite"><img class="add-bookmark" pid="' + product_list[i].pid + '" src="https://resource.wanbaolife.com/static/images/star.png" width="25" height="24"></div>';
              		}
               		product_obj_html += '</div>';
               		product_obj_html += '</div>';
               		inner_html += product_obj_html;
            	}
                $('#result_list').empty();
                $('#result_list').html(inner_html);

                // build page-num-box
                inner_html = "";
                if (page_num == total_page_count)
                {
                	inner_html += '<div><img src="https://resource.wanbaolife.com/static/images/page-left.png"></div>';
                } 

			}
			else
			{
				$("#total_product_count").text("0");
				$("#result_list").html("<h2>查询出错，请稍后再试</h2>");
				$("#page-num-box").empty();
			}
		});
	}

	$(".search_filter").on("change", function()
	{
		update_search_result(1);
	});

	$(document).on("click", ".add-bookmark", function()
	{
		var bookmark_obj = $(this);
		var pid = bookmark_obj.attr("pid");
		var url = URL + '/users/add_followed_product';
		$.post(url,
		{
			pid: pid,
			session_key: SESSION_KEY
		}, function(data, status){
			if (data.err_code == 0) 
			{
				bookmark_obj.attr("src", "https://resource.wanbaolife.com/static/images/star-solid.png");
				bookmark_obj.addClass("rm-bookmark");
				bookmark_obj.removeClass("add-bookmark");
				alert("add bookmark OK!");
			}
		});

	});

	$(document).on("click", ".rm-bookmark", function()
	{
		var bookmark_obj = $(this);
		var pid = bookmark_obj.attr("pid");
		var url = URL + '/users/cancel_followed_product';
		$.post(url,
		{
			pid: pid,
			session_key: SESSION_KEY
		}, function(data, status){
			if (data.err_code == 0) 
			{
				bookmark_obj.attr("src", "https://resource.wanbaolife.com/static/images/star.png");
				bookmark_obj.addClass("add-bookmark");
				bookmark_obj.removeClass("rm-bookmark");
				alert("remove bookmark OK!");
			}
		});

	});

	$(document).on("click", ".page-num-box .page-num", function()
	{
		console.log($(this).text());
	});

	get_search_filter();
	update_search_result(1);
})
