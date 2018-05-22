<!-- wechat-pay.js -->

$(function() {
	var SESSION_KEY = sessionStorage.getItem("session_key");
	var order_sn = $("#order_sn").text();
	var url = '/orders/wbzx_order_status_query';
    post_data = {
    	session_key: SESSION_KEY,
    	order_sn: order_sn
    }

    window.setInterval(function()
    {
	    $.post(url, post_data, function(data, status)
	    {
	    	if (data.order_status == 1)
	    	{
		        window.setTimeout(function(){
		            window.location = '../subscription.html';
		        }, 1000);
	    	}
	    });
	}, 3000);

})