/*! index.js */
$(function($) {

  //弹出登录
  $(".popup_loginbox").on('click', function () {
    $("body").append("<div id='mask'></div>");
    $("#mask").addClass("mask").fadeIn("slow");
    $("#login_box").fadeIn("slow");
  });

  //弹出register
  $(".popup_registerbox").on('click', function () {
    $("body").append("<div id='mask'></div>");
    $("#mask").addClass("mask").fadeIn("slow");
    $("#register_box").fadeIn("slow");
  });

  //关闭 loginBox
  $(".close_loginbox_btn").hover(function () { $(this).css({ color: 'black' }) }, function () { $(this).css({ color: '#999' }) }).on('click', function () {
    $("#login_box").fadeOut("fast");
    $(".mask").css({ display: 'none' });
    $("#login_tel").val("");
    $("#login_warning_msg").text("");
  });

  //关闭 registerBox
  $(".close_registerbox_btn").hover(function () { $(this).css({ color: 'black' }) }, function () { $(this).css({ color: '#999' }) }).on('click', function () {
    $("#register_box").fadeOut("fast");
    $(".mask").css({ display: 'none' });
    $("#register_tel").val("");
    $("#register_warning_msg").text("");
  });

  //tel effect
  $("#login_sms_verifiy").click(function(){
    var tel_format = /^1\d{10}$/;
    var tel_num = $("#login_tel").val();
    if ( tel_format.test(tel_num) && tel_num.length == 11)
    {
      $("#login_warning_msg").text("手机号码不正确，请您重新输入");
      // $("#login_warning_msg").css({ color: 'red' });
    }
    else if (tel_num == "1")
    {
      $("#login_warning_msg").text("短信验证码不正确，请您重新输入");
      // $("#login_warning_msg").css({ color: 'red' });
    }
    else if (tel_num == "2")
    {
      $("#login_warning_msg").html("<div>您还未订阅我们的服务。</div>\
      <div>订阅前，请您先免费体验 1 个月。点击此处&nbsp;&nbsp;<a href='javascript:void(0)' id='switch_to_register'>免费体验&nbsp;&gt;</a></div>");  
      // switch to register
      $("#switch_to_register").click(function (){
        $("#login_box").fadeOut("fast");
        $("#register_box").fadeIn("fast"); 
        $("#register_warning_msg").text("");
        $("#register_tel").val("");
      });
    }
    else if (tel_num == "3")
    {
      $("#login_warning_msg").text("登录成功！正在进入系统，请稍侯片刻...");
      // $("#login_warning_msg").css({ color: 'blue' });
    }
    else
    {
      var count_down = 10;
      $("#login_warning_msg").text("");
      $("#login_sms_verifiy").css({display:"none"});
      $("#login_sms_verifiy_span").css({display:"block"});
      //login_sms_verifiy effect
      $("#login_sms_verifiy_span").text(count_down.toString() + "秒后再次发送");
      count_down--;
      var time = setInterval(function(){
        if (count_down > 0)
        {
          $("#login_sms_verifiy_span").text(count_down.toString() + "秒后再次发送");
          count_down--;
        }
        else
        {
          $("#login_sms_verifiy_span").css({display:"none"});
          $("#login_sms_verifiy").css({display:"block"});
          clearInterval(time);
        }
      }, 1000);
    }
  });

  $("#register_sms_verifiy").click(function(){
    var tel_format = /^1\d{10}$/;
    var tel_num = $("#register_tel").val();
    if ( tel_format.test(tel_num) && tel_num.length == 11)
    {
      $("#register_warning_msg").text("手机号码不正确，请您重新输入");
      // $("#register_warning_msg").css({ color: 'red' });
    }
    else if (tel_num == "1")
    {
      $("#register_warning_msg").text("短信验证码不正确，请您重新输入");
      // $("#register_warning_msg").css({ color: 'red' });
    }
    else if (tel_num == "2")
    {
      $("#register_warning_msg").html("您已订阅了我们的服务，请直接登录。点击此处&nbsp;<a href='javascript:void(0)' id='switch_to_login'>登录&nbsp;</a>");  
      // switch to register
      $("#switch_to_login").click(function (){
        $("#register_box").fadeOut("fast");
        $("#login_box").fadeIn("fast");
        $("#login_warning_msg").text("");
        $("#login_tel").val("");
      });
    }
    else if (tel_num == "3")
    {
      $("#register_warning_msg").text("申请成功！马上开始体验，请稍侯片刻...");
      // $("#register_warning_msg").css({ color: 'blue' });
    }
    else
    {
      var count_down = 10;
      $("#register_warning_msg").text("");
      $("#register_sms_verifiy").css({display:"none"});
      $("#register_sms_verifiy_span").css({display:"block"});
      //login_sms_verifiy effect
      $("#register_sms_verifiy_span").text(count_down.toString() + "秒后再次发送");
      count_down--;
      var time = setInterval(function(){
        if (count_down > 0)
        {
          $("#register_sms_verifiy_span").text(count_down.toString() + "秒后再次发送");
          count_down--;
        }
        else
        {
          $("#register_sms_verifiy_span").css({display:"none"});
          $("#register_sms_verifiy").css({display:"block"});
          clearInterval(time);
        }
      }, 1000);
    }
  });

});
