
$(function() {
	$(document).ready(function() {
		// 弹出 contactBox
		$('.popup_contactbox').click(function() {
			$('.mask').css('display', 'block');
			$('.contactbox').fadeIn('slow');
		});
		// 业务选择
		function businessChoose() {			
			if($(this).hasClass('add-compare')) {
				$(this).removeClass('add-compare').addClass('remove-compare');
				return;
			}
			if($(this).hasClass('remove-compare')) {
				$(this).removeClass('remove-compare').addClass('add-compare');
				return;
			}
		};
		$('.business-checkbox').on('click', '.business-checkbox-pic', businessChoose);

		// 关闭 contactBox
		function closeBox() {
			$('.mask').css('display', 'none');
			$('.contactbox').fadeOut('fast');
			$('#contact_tel').val('');
			$('#contact_warning_msg').text('');
			$('.business-checkbox-pic').removeClass('remove-compare').addClass('add-compare');
		};
		$('.close_contactbox_btn').click(function() {
			closeBox();
		});

		// 检查 手机号码
		function telTest() {
			let tel_format = /^1\d{10}$/;
			let tel_num = $('#contact_tel').val();
			if ( !tel_format.test(tel_num) || tel_num.length != 11 ) {
				$('#contact_warning_msg').text('手机号码不正确，请您重新输入。');
				return null;
			}else {
				return tel_num;
			}
		};
		// 检查	选择业务
		function businessTest() {
			let business_choosed = $('.business-checkbox').find('.remove-compare');
			if (!business_choosed.length) {
				$('#contact_warning_msg').text('请选择至少一项业务。');
				return null;
			}else {
				let intention = [];
				for (let i = 0; i < business_choosed.length; i++) {
					intention.push(business_choosed[i].textContent);
				}
				return intention.join();				
			}
		};


		// 提交表单
		$('#contactbtn').click(function() {
			$('#contact_warning_msg').text('');
			let tel_test = telTest();
			let business_test = businessTest();
			if (tel_test && business_test) {
				let url = '/helpdesk/business_contact';
				$.post(url, 
					{
						tel: tel_test,
						intention: business_test
					}, 
					function() {
						$('#contact_warning_msg').text('我们已收到你的合作意向，将尽快联系你。');
						setTimeout(function() {
							closeBox();
						}, 1000);
				});
			}
		});
		
	});
})