$(function() {
	var SESSION_KEY = sessionStorage.getItem("session_key");
	var tel = sessionStorage.getItem("mobile");
	var URL = "https://www.wanbaolife.com";

	$('.userstatus').text(tel + '，已登录');

	function favorite_list (page_num) 
	{
		var url = URL + "/users/get_my_followed_product";

		$.post(url, {session_key: SESSION_KEY}, function(data,status) 
		{
			if (data.my_followed_product_list.length > 0) 
			{
				var my_followed_product_list = data.my_followed_product_list;

				var inner_html = "";
				for (var i = 0; i < my_followed_product_list.length; i++) 
				{
					var my_followed_product_html = "";
					my_followed_product_html += '<div class="product clearfix">';
					my_followed_product_html += '<div class="product-box clearfix">';
					my_followed_product_html += '<div class="product-box-left">';
					my_followed_product_html += '<div class="insurer-img">';
					my_followed_product_html += '<img src="' + my_followed_product_list[i].insurer_logo +'"></div>';
					my_followed_product_html += '</div>';
					my_followed_product_html += '<div class="product-box-right">';
					my_followed_product_html += '<div class="product-text">';
					my_followed_product_html += '<h2><a target="_blank" href="goodsDetail.html?pid=' + my_followed_product_list[i].pid + '">' + my_followed_product_list[i].product_name + '</a></h2>';
					my_followed_product_html += '</div>';

					my_followed_product_html += '<div class="product-detail">';
					my_followed_product_html += '<table><tbody><tr>';
					my_followed_product_html += '<td>'+ my_followed_product_list[i].insurer_abbreviation +'</td>';
					my_followed_product_html += '<td>'+ my_followed_product_list[i].product_class +'</td>';
					my_followed_product_html += '<td>'+ my_followed_product_list[i].product_structure +'</td>';
					my_followed_product_html += '<td>'+ my_followed_product_list[i].filing_year +'</td>';
					my_followed_product_html += '<td class="tdsale">'+ my_followed_product_list[i].sale_available +'</td>';
					my_followed_product_html += '</tr></tbody></table>';
					my_followed_product_html += '</div>';
					my_followed_product_html += '</div>';
					my_followed_product_html += '</div>';

					my_followed_product_html += '<div class="product-function">';
					my_followed_product_html += '<div class="function-box clearfix">';
					my_followed_product_html += '<div class="favorite heart-solid" pid="'+ my_followed_product_list[i].pid +'">取消收藏</div>';
					my_followed_product_html += '</div>';
					my_followed_product_html += '</div>';
					my_followed_product_html += '</div>';

					inner_html += my_followed_product_html;
				};
				$('#favorite_list').empty();
				$('#favorite_list').html(inner_html);
			}else if (data.my_followed_product_list.length == 0) {
				layer.msg('没有收藏产品', {icon: 1});
			}else {
				layer.confirm('请重新登录', {
					btn: ['确定', '取消']  //按钮
				}, function() {
					window.location = 'index.html';
				});
			}
		});
	};

	favorite_list(1);

	$(document).on('click', '.favorite', function() {
		var favorite_obj = $(this);
		var pid = favorite_obj.attr('pid');
		var url = URL + '/users/cancel_followed_product';

		$.post(url, {pid:pid, session_key:SESSION_KEY}, function(data,status) {
			if (data.err_code == 0){
				layer.msg('取消收藏成功', {icon: 1});
				favorite_list(1);
			}
		});
	});
})