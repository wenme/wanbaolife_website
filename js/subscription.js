/*subscription.js*/

$(function () {
	var SESSION_KEY = sessionStorage.getItem("session_key");
	var tel = sessionStorage.getItem("mobile");
	var PACKAGE_INFO_LIST = [];
    
	function get_subscription_status()
	{
		var url = "/users/my_wbzx_subscription_status";
		var timestamp = Date.parse(new Date()) / 1000;
		var post_data = {
			session_key: SESSION_KEY,
			timestamp: timestamp
		};
		$.post(url, post_data, function(data, status)
		{
			if (data.err_code == 0)
			{
	            var subscription_log = data.subscription_status.subscription_log;
	            var current_subscription_name = data.subscription_status.current_subscription_name;
	            var current_validity = data.subscription_status.current_validity;
	            var current_subscription_deadline = data.subscription_status.current_subscription_deadline;

	            $("#login_info").text(tel+"，已登录");
	            $("#current_subscription_name").text(current_subscription_name);
	            $("#current_validity").text(current_validity + "天");
	            $("#current_subscription_deadline").text(current_subscription_deadline);

	            // build subscription list
	            var inner_html = "";
	            for (var i = 0; i < subscription_log.length; i++)
            	{
               		var subscription_log_html = '';
              		subscription_log_html += '<div class="row-succeed-plan">';
              		subscription_log_html += '<span class="row-sb">' + subscription_log[i][0] + '</span>';
              		subscription_log_html += '<span class="row-sb">' + subscription_log[i][1] + '</span>';
              		subscription_log_html += '<span class="row-sb">' + subscription_log[i][2] + '天</span>';
              		subscription_log_html += '<span class="row-sb">' + subscription_log[i][3] + '元</span>';
              		if (subscription_log[i][4].indexOf("正在使用") != -1) 
              		{
              			subscription_log_html += '<span class="row-sb curren-subscription">' + subscription_log[i][4] + '</span>';
              		}else {
              			subscription_log_html += '<span class="row-sb">' + subscription_log[i][4] + '</span>';
              		}              		
              		subscription_log_html += '</div>';
               		inner_html += subscription_log_html;
            	}
                $('#succeed-plan-body').empty();
                $('#succeed-plan-body').html(inner_html);
			}
			else
			{
	            layer.confirm('请重新登录', {
	                btn: ['确定', '取消'] //按钮
	            }, function () {
	                window.location = 'index.html';
	            });
			}
		});
	}

	function get_subscription_list()
	{
		var url = "/goods/subscription_package_list";
		var timestamp = Date.parse(new Date()) / 1000;
		var post_data = {
			session_key: SESSION_KEY,
			timestamp: timestamp
		};
		$.post(url, post_data, function(data, status)
		{
			if (data.err_code == 0)
			{
				PACKAGE_INFO_LIST = data.package_list;
				var inner_html = '';
				for (var i = 0; i < PACKAGE_INFO_LIST.length; i++)
				{
					var package_obj_html = '';
					if (i == 0)
					{
						package_obj_html += '<a href="javascript:;" class="plan-box yearly plan-box-on" package_box_id="0" package_id="' + PACKAGE_INFO_LIST[i].package_id + '">';
						package_obj_html += '<div class="big-sale">超值</div>';
					}
					else if (i == 1)
					{
						package_obj_html += '<a href="javascript:;" class="plan-box half-year" package_box_id="1" package_id="' + PACKAGE_INFO_LIST[i].package_id + '">';
						package_obj_html += '<div class="popular">爆款</div>';
					}
					else if (i == 2)
					{
						package_obj_html +=  '<a href="javascript:;" class="plan-box quarterly" package_box_id="2" package_id="' + PACKAGE_INFO_LIST[i].package_id + '">';
						package_obj_html +=  '<div class="false-box"></div>';
					}
					else
					{
						package_obj_html +=  '<a href="javascript:;" class="plan-box" package_box_id="' + i + '" package_id="' + PACKAGE_INFO_LIST[i].package_id + '">';
						package_obj_html +=  '<div class="false-box"></div>';						
					}
					package_obj_html += '<div class="plan-box-text">';
					package_obj_html += '<h1>' + PACKAGE_INFO_LIST[i].name + '</h1>';
					package_obj_html += '<p class="price">￥ <i class="price-num">' + PACKAGE_INFO_LIST[i].monthly_price + '元</i>&nbsp; /月</p>';
                    if (PACKAGE_INFO_LIST[i].discount == "0%")
						package_obj_html += '<p class="saving">没有为你节省任何费用</p>';
					else
						package_obj_html += '<p class="saving">为你节省 ' + PACKAGE_INFO_LIST[i].discount + '！</p>';
					package_obj_html += '</div></a>';
					inner_html += package_obj_html;
				}
				$("#subscribe-boxes").empty();
				$("#subscribe-boxes").html(inner_html);

				$("#plan-name").text(PACKAGE_INFO_LIST[0].name);
				$("#package_monthly_price").text("￥" + PACKAGE_INFO_LIST[0].monthly_price + "元");
				$("#package_validity").text(PACKAGE_INFO_LIST[0].validity + "天");
				$("#total_amount").text("￥" + PACKAGE_INFO_LIST[0].actual_price + "元");

			}
			else
			{
	            layer.confirm('请重新登录', {
	                btn: ['确定', '取消'] //按钮
	            }, function () {
	                window.location = 'index.html';
	            });
			}
		});
	}

    // 选择订阅计划  
    $(document).on('click', '.plan-box', function () {
      if ($(this).hasClass('plan-box-on') == false) 
      {
          var currentBox = $('.subscribe-box').find('.plan-box-on');
          currentBox.removeClass('plan-box-on');
          $(this).addClass('plan-box-on');

          var currentPrice = $('.subscribe-box').find('.price-on');
          currentPrice.removeClass('price-on');
          $(this).find('.price').addClass('price-on');

          var current_box_id = parseInt($(this).attr("package_box_id"));
  		  $("#plan-name").text(PACKAGE_INFO_LIST[current_box_id].name);
  		  $("#package_monthly_price").text("￥" + PACKAGE_INFO_LIST[current_box_id].monthly_price + "元");
  		  $("#package_validity").text(PACKAGE_INFO_LIST[current_box_id].validity + "天");
  		  $("#total_amount").text("￥" + PACKAGE_INFO_LIST[current_box_id].actual_price + "元");
      }
    });

    // make an order
    $("#make_an_order").on('click', function() {
    	var url = "/orders/wbzx_make_order";
    	var timestamp = Date.parse(new Date()) / 1000;
    	var package_id = $(".plan-box-on").attr("package_id");
    	var channel = $("input[name='payment-way']:checked").val();
    	if (channel == null)
    	{
            layer.confirm('选择支付方式', {
                btn: ['确定', '取消'] //按钮
            });    		
    	}
    	else
    	{
    		// 创建Form 
    		var form = $('<form></form>');
		    // 设置属性  
		    form.attr('action', url);  
		    form.attr('method', 'POST');  
		    // form的target属性决定form在哪个页面提交  
		    // _self -> 当前页面 _blank -> 新页面  
		    form.attr('target', '_self');  
		    // 创建Input  附加到Form 
		    var input_timestamp = $('<input type="text" name="timestamp" />');  
		    input_timestamp.attr('value', timestamp);  
		    form.append(input_timestamp);

		    var input_session_key = $('<input type="text" name="session_key" />');  
		    input_session_key.attr('value', SESSION_KEY);  
		    form.append(input_session_key);

		    var input_package_id = $('<input type="text" name="package_id" />');  
		    input_package_id.attr('value', package_id);  
		    form.append(input_package_id);

		    var input_channel = $('<input type="text" name="channel" />');  
		    input_channel.attr('value', channel);  
		    form.append(input_channel);
		    // 提交表单
		    $(document.body).append(form);
		    form.submit();  
		    // 注意return false取消链接的默认动作  
		    // return false;  
    	}
    });

    get_subscription_status();
    get_subscription_list();
})
