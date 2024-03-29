// product-compare.js

$(function(){
	var pid_a = GetQueryString("pid_a");
	var pid_b = GetQueryString("pid_b");
	var SESSION_KEY = sessionStorage.getItem("session_key");
	var timestamp = Date.parse(new Date()) / 1000;

	var post_data = {
		pid_a: pid_a.split('|')[0],
		pid_b: pid_b.split('|')[0],
		timestamp: timestamp,
		session_key: SESSION_KEY
	};
	var url = '/terms/wbzx_product_compare';
	post_data['sign'] = complete_digest(post_data);
	$.post(url, post_data, function(data, status)
	{
		//TODO product name & insurer logo
		$("#product_name_a").html('<a target="_blank" href="goodsDetail.html?pid=' + pid_a.split('|')[0] + '">' + data.compare_info.product_name_a + '</a>');
		$("#product_name_b").html('<a target="_blank" href="goodsDetail.html?pid=' + pid_b.split('|')[0] + '">' + data.compare_info.product_name_b + '</a>');
		$("#insurer_logo_a").attr("src", data.compare_info.insurer_logo_a);
		$("#insurer_logo_b").attr("src", data.compare_info.insurer_logo_b);

		//TODO SIX part for product infos
		var compare_info_table = data.compare_info.compare_info_table;
		var title_arr = [];
		var inner_html = '';
		for (var i = 0; i < compare_info_table.length; i++)
		{
			var row_info = compare_info_table[i];
			var row_html = '';
			if (row_info[0] == '0')
			{
				if (inner_html.length > 0)
				{
					row_html += '</div>';
				}
				row_html += '<div id="' + row_info[2] + '" class="small-box">';
				row_html += '<div class="title">' + row_info[1] + '</div>';
				title_arr.push([row_info[2], row_info[1]]);
			}
			else if (row_info[0] == '1')
			{
				row_html += '<div class="sub-title">' + row_info[1] + '</div>';
			}
			else
			{
				row_html += '<div class="normal">';
				if (row_info[1].length < 20) 
					{row_html += '<div class="box-left normal-left">' + row_info[1] + '</div>';} 
				else 
					{row_html += '<div class="box-left normal-left small-font-size">' + row_info[1] + '</div>';}
				if (row_info[3].length < 20) 
					{row_html += '<div class="box-center normal-center">';} 
				else 
					{row_html += '<div class="box-center normal-center small-font-size">';}							
				if (row_info[2] == '1')
				    row_html += '<img class="normal-img-left" src="https://pics.wanbaolife.com/tick.png?v=1">';
				else
					row_html += '<img class="normal-img-left" src="https://pics.wanbaolife.com/no-tick.png?v=1">';
				row_html += row_info[3];
				if (row_info[4] == '1')
				    row_html += '<img class="normal-img-right" src="https://pics.wanbaolife.com/tick.png?v=1">';
				else
					row_html += '<img class="normal-img-right" src="https://pics.wanbaolife.com/no-tick.png?v=1">';
				row_html += '</div>';
				if (row_info[5].length < 20) 
					{row_html += '<div class="box-right normal-right">' + row_info[5] + '</div>';} 
				else 
					{row_html += '<div class="box-right normal-right small-font-size">' + row_info[5] + '</div>';}
				
				row_html += '</div>';
			}
			inner_html += row_html;
		}
		$("#box-body").empty();
		$("#box-body").html(inner_html);

		//TODO menu
		var inner_html = '<ul>';
		for (var i = 0; i < title_arr.length; i++)
		{
			if (i == 0)
				inner_html += '<li><a href="javascript:;" name="#' + title_arr[i][0] + '" class="current">' + title_arr[i][1] + '</a></li>';
			else
				inner_html += '<li><a href="javascript:;" name="#' + title_arr[i][0] + '">' + title_arr[i][1] + '</a></li>';
		}
		inner_html += '</ul>';
		$("#menu").empty();
		$("#menu").html(inner_html);
	});
})