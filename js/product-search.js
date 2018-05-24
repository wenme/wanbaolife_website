//product-search.js 

$(function () {
	var SESSION_KEY = sessionStorage.getItem("session_key");
	var tel = sessionStorage.getItem("mobile");

	show_and_hide = function(div_id) 
	{
		var show_status = document.getElementById(div_id).style.display;
		var href_id = div_id.replace("table", "arrow");
		var img_id = href_id + "_img";	
		if (show_status == "inline-block"){
			document.getElementById(img_id).src = "http://p86qgj9gq.bkt.clouddn.com/right-arrow.png?v=1";
			document.getElementById(div_id).style.display = "none";
		}
		else
		{
			document.getElementById(img_id).src = "http://p86qgj9gq.bkt.clouddn.com/down-arrow.png?v=1";
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
	   var url = '/terms/get_search_filter';
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
		var compare_product_a = sessionStorage.getItem("compare_product_a");
		var compare_product_b = sessionStorage.getItem("compare_product_b");
		var url = "/terms/wbzx_product_search";
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
		var timestamp = Date.parse(new Date()) / 1000;

		var post_data = {
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
			page_num: page_num,
			timestamp: timestamp
		};
		post_data['sign'] = complete_digest(post_data);
		$.post(url, post_data, function(data, status)
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
               		product_obj_html += '<div class="product-box clearfix">';
               		product_obj_html += '<div class="product-box-left">';
               		product_obj_html += '<div class="insurer-img"><img src="' + product_list[i].insurer_logo + '" width="72" height="72"></div>';
               		product_obj_html += '</div>';
               		product_obj_html += '<div  class="product-box-right">';
               		product_obj_html += '<div class="product-text">';
               		product_obj_html += '<h2><a target="_blank" href="goodsDetail.html?pid=' + product_list[i].pid + '">' + product_list[i].product + '</a></h2>';
               		product_obj_html += '</div>';
               		product_obj_html += '<div class="product-detail">';
               		product_obj_html += '<table><tbody><tr>';
               		product_obj_html += '<td>' + product_list[i].insurer_abbreviation + '</td>';
               		product_obj_html += '<td>' + product_list[i].product_class + '</td>';
               		product_obj_html += '<td>' + product_list[i].product_structure + '</td>';
               		product_obj_html += '<td>' + product_list[i].filing_year + '</td>';
               		product_obj_html += '<td class="tdsale">' + product_list[i].sale_available + '</td>'
               		product_obj_html += '</tr></tbody></table>';
               		product_obj_html += '</div>';
               		product_obj_html += '</div>';
               		product_obj_html += '</div>';

               		product_obj_html += '<div class="product-function">';
               		product_obj_html += '<div class="function-box clearfix">';

               		var pid_a = '';
               		if ( compare_product_a != null)
               			pid_a = compare_product_a.split('|')[0];
               		var pid_b = '';
               		if ( compare_product_b != null)
               			pid_b = compare_product_b.split('|')[0];
               		if (product_list[i].pid != pid_a && product_list[i].pid != pid_b)
               		{
               			product_obj_html += '<div class="select-compare add-compare" pid="' + product_list[i].pid + '" product_name="' + product_list[i].product + '">加入对比</div>';
               		}
               		else
               		{
               			product_obj_html += '<div class="select-compare remove-compare" pid="' + product_list[i].pid + '" product_name="' + product_list[i].product + '">取消对比</div>';
               		}
               		if (product_list[i].is_followed == 1)
               		{
               			product_obj_html += '<div class="favorite heart-solid" title="取消收藏" pid="' + product_list[i].pid + '" product_name="' + product_list[i].product + '">取消收藏</div>';
               		}
               		else
               		{
               			product_obj_html += '<div class="favorite heart" title="添加收藏" pid="' + product_list[i].pid + '" product_name="' + product_list[i].product + '">添加收藏</div>';
              		}
              		product_obj_html += '</div>';
               		product_obj_html += '</div>';
               		product_obj_html += '</div>';
               		inner_html += product_obj_html;
            	}
                $('#result_list').empty();
                $('#result_list').html(inner_html);

                // reset page-num-box
                if (page_num == 1)
                {
                	$("#go-to-first-page img").attr("src", "http://p86qgj9gq.bkt.clouddn.com/page-first-disabled.png?v=1");
                 	$("#go-to-first-page").removeClass("page-num-extra");
	               	$("#go-to-prev-page img").attr("src", "http://p86qgj9gq.bkt.clouddn.com/page-left-disabled.png?v=1");
	               	$("#go-to-prev-page").removeClass("page-num-extra");
                }
                else
                {
                	//activate first page button
                	$("#go-to-first-page img").attr("src", "http://p86qgj9gq.bkt.clouddn.com/page-first-hover.png?v=1");
                 	if ($("#go-to-first-page").hasClass("page-num-extra") == false)
                 	{
                 		$("#go-to-first-page").addClass("page-num-extra");
                 	}

                	//activate prev page button
                	$("#go-to-prev-page img").attr("src", "http://p86qgj9gq.bkt.clouddn.com/page-left.png?v=1");
                 	if ($("#go-to-prev-page").hasClass("page-num-extra") == false)
                 	{
                 		$("#go-to-prev-page").addClass("page-num-extra");
                 	}
                }

                if (page_num == total_page_count)
                {
                 	$("#go-to-next-page img").attr("src", "http://p86qgj9gq.bkt.clouddn.com/page-right-disabled.png?v=1");
                 	$("#go-to-next-page").removeClass("page-num-extra");
                	$("#go-to-last-page img").attr("src", "http://p86qgj9gq.bkt.clouddn.com/page-last-disabled.png?v=1");
                 	$("#go-to-last-page").removeClass("page-num-extra");
                }
                else
                {
                 	$("#go-to-next-page img").attr("src", "http://p86qgj9gq.bkt.clouddn.com/page-right.png?v=1");
                 	if ($("#go-to-next-page").hasClass("page-num-extra") == false)
                 	{
                 		$("#go-to-next-page").addClass("page-num-extra");
                 	}

                	$("#go-to-last-page img").attr("src", "http://p86qgj9gq.bkt.clouddn.com/page-last-hover.png?v=1");
                 	if ($("#go-to-last-page").hasClass("page-num-extra") == false)
                 	{
                 		$("#go-to-last-page").addClass("page-num-extra");
                 	}
				}

                $("#page-num").text(page_num);
                $("#total-page-count").text(total_page_count);
			}
			else if (data.err_code > 0)
			{
	            layer.confirm('请重新登录', {
	                btn: ['确定', '取消'] //按钮
	            }, function () {
	                window.location = 'index.html';
	            });
			}
			else
			{
				$("#total_product_count").text("0");
				$("#result_list").html("<p style='margin-top:50px;'>查询出错，请稍后再试</p>");
				$("#page-box").css({"display": "none"});
			}
		});
	}

	// update compare bucket
	function update_compare_bucket()
	{
		var compare_product_a = sessionStorage.getItem("compare_product_a");
		var compare_product_b = sessionStorage.getItem("compare_product_b");

		if (compare_product_a != null && compare_product_b != null)
		{
			$("#compare-btn").addClass("compare-btn-on");
			$("#compare-btn").attr("href", "https://www.wanbaolife.com/terms/index");
		}
		else
		{
			$("#compare-btn").removeClass("compare-btn-on");
			$("#compare-btn").attr("href", "javascript:;");
		}

		if (compare_product_a != null)
		{
			var pid = compare_product_a.split('|')[0];
			var product_name = compare_product_a.split('|')[1];
			var inner_html = '';
			inner_html += '<div class="add-product">' + product_name + '</div>';
			inner_html += '<div class="cancel-item">';
			inner_html += '<a href="javascript:clear_compare(\'compare_product_a\');"><span>取消对比</span></a>';
			inner_html += '</div>';
			$("#compare_product_a").empty();
			$("#compare_product_a").html(inner_html);
		}
		else
		{
			var inner_html = '<div id="compare_product_a"><div class="add-product">加入要对比的产品</div><div class="cancel-item"><span>取消对比</span></div>';
			$("#compare_product_a").empty();
			$("#compare_product_a").html(inner_html);			
		}

		if (compare_product_b != null)
		{
			var pid = compare_product_b.split('|')[0];
			var product_name = compare_product_b.split('|')[1];
			var inner_html = '';
			inner_html += '<div class="add-product">' + product_name + '</div>';
			inner_html += '<div class="cancel-item">';
			inner_html += '<a href="javascript:clear_compare(\'compare_product_b\');"><span>取消对比</span></a>';
			inner_html += '</div>';
			$("#compare_product_b").empty();
			$("#compare_product_b").html(inner_html);
		}
		else
		{
			var inner_html = '<div id="compare_product_b"><div class="add-product">加入要对比的产品</div><div class="cancel-item"><span>取消对比</span></div>';
			$("#compare_product_b").empty();
			$("#compare_product_b").html(inner_html);
		}
	}

	// clear compare bucket
	clear_compare = function(obj)
	{
		var compare_product_obj = sessionStorage.getItem(obj);
		var pid = compare_product_obj.split("|")[0]
		sessionStorage.removeItem(obj);

		var product_box_cmp = $(".select-compare[pid='"+pid+"']");
		product_box_cmp.removeClass('remove-compare');
		product_box_cmp.addClass('add-compare');
		product_box_cmp.text('加入对比');

		update_compare_bucket();
	}

	//clear_all_compares
	clear_all_compares = function()
	{
		var compare_product_obj = sessionStorage.getItem("compare_product_a");
		if (compare_product_obj != null)
		{
			var pid = compare_product_obj.split("|")[0]
			sessionStorage.removeItem("compare_product_a");
			var product_box_cmp = $(".select-compare[pid='"+pid+"']");
			product_box_cmp.removeClass('remove-compare');
			product_box_cmp.addClass('add-compare');
			product_box_cmp.text('加入对比');
		}

		var compare_product_obj = sessionStorage.getItem("compare_product_b");
		if (compare_product_obj != null)
		{
			var pid = compare_product_obj.split("|")[0]
			sessionStorage.removeItem("compare_product_b");

			var product_box_cmp = $(".select-compare[pid='"+pid+"']");
			product_box_cmp.removeClass('remove-compare');
			product_box_cmp.addClass('add-compare');
			product_box_cmp.text('加入对比');
		}

		update_compare_bucket();
	}

	$(".search_filter").on("change", function()
	{
		update_search_result(1);
	});

	$("#search_img").click(function()
	{
		update_search_result(1);
	});

	$(document).on("click", ".favorite", function()
	{
		var bookmark_obj = $(this);
		var pid = bookmark_obj.attr("pid");
		if (bookmark_obj.hasClass('heart'))
			var url = '/users/add_followed_product';
		else
			var url = '/users/cancel_followed_product';
		$.post(url,
		{
			pid: pid,
			session_key: SESSION_KEY
		}, function(data, status){
			if (data.err_code == 0) 
			{
				if (bookmark_obj.hasClass('heart'))
				{
			        bookmark_obj.removeClass('heart');
			        bookmark_obj.addClass('heart-solid')
			        bookmark_obj.text('取消收藏');
	                layer.msg('收藏成功', {icon: 1, time: 1000});
            	}
            	else
            	{
		          	bookmark_obj.addClass('heart');
		          	bookmark_obj.removeClass('heart-solid')
		          	bookmark_obj.text('收藏');
            		layer.msg('取消成功', {icon: 1, time: 1000});
            	}
			}
			else
			{
				layer.msg('操作失败！', {icon: 0});
			}
		});

	});

	$("#go-to-first-page").click(function()
	{
		var current_page_num = parseInt($("#page-num").text());
		if ( current_page_num > 1)
		{
			update_search_result(1);
		}
	});

	$("#go-to-prev-page").click(function()
	{
		var current_page_num = parseInt($("#page-num").text());
		if (current_page_num > 1)
		{		
			update_search_result(current_page_num-1);
		}
	});

	$("#go-to-next-page").click(function()
	{
		var current_page_num = parseInt($("#page-num").text());
		var total_page_num = parseInt($("#total-page-count").text());
		if (current_page_num < total_page_num)
		{	
			update_search_result(current_page_num+1);
		}
	});

	$("#go-to-last-page").click(function()
	{
		var current_page_num = parseInt($("#page-num").text());
		var total_page_num = parseInt($("#total-page-count").text());
		if (current_page_num < total_page_num)
		{	
			update_search_result(total_page_num);
		}
	});


	// 加入对比与取消对比、收藏与取消收藏
	$(document).on('click', '.select-compare', function () 
	{
		var compare_product_a = sessionStorage.getItem("compare_product_a");
		var compare_product_b = sessionStorage.getItem("compare_product_b");
		if ( compare_product_a != null && compare_product_b != null && $(this).hasClass("add-compare"))
		{
			layer.msg('对比栏已满!', {icon: 1, time: 1000});
			return;
		}

		if ($(this).hasClass('add-compare')) 
		{
		  $(this).removeClass('add-compare');
		  $(this).addClass('remove-compare');
		  $(this).text('取消对比');

		  // add session storage
		  if (!compare_product_a)
		  {
		  	sessionStorage.setItem("compare_product_a", $(this).attr("pid") + '|' + $(this).attr("product_name"));
		  }
		  else if (!compare_product_b)
		  {
		  	sessionStorage.setItem("compare_product_b", $(this).attr("pid") + '|' + $(this).attr("product_name"));
		  }
		  else
		  {
		  	layer.msg('对比栏添加失败!', {icon: 1, time: 1000});
		  }
		} else 
		{
		  $(this).addClass('add-compare');
		  $(this).removeClass('remove-compare');
		  $(this).text('加入对比');

          // remove session storage
		  var pid_a = compare_product_a.split('|')[0];
		  var pid_b = compare_product_b.split('|')[0];
		  if (pid_a == $(this).attr("pid"))
		  {
		  	sessionStorage.removeItem('compare_product_a');
		  }
		  if (pid_b == $(this).attr("pid"))
		  {
		  	sessionStorage.removeItem('compare_product_b');
		  }
		}
		update_compare_bucket();
	});


	get_search_filter();
	update_search_result(1);
	update_compare_bucket();
})
