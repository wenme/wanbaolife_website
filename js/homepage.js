/*! homepage.js */

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

  //登录的事儿
  $("#login_sms_verifiy").click(function()
  {
    var tel_format = /^1\d{10}$/;
    var tel_num = $("#login_tel").val();
    var number_status = 0;
    if ( !tel_format.test(tel_num) || tel_num.length != 11)
    {
      $("#login_warning_msg").text("手机号码不正确，请您重新输入");
      // $("#login_warning_msg").css({ color: 'red' });
    }
    else
    {
      // verify this phone number
      var url = "/users/verify_tel";
      $.post(url,
      {
        tel: tel_num
      },
      function(data, status)
      {
        number_status = data.ret.tel_available;
        if (number_status == 1)
        {
          $("#login_warning_msg").html("<div>您还未订阅我们的服务。</div>\
          <div>订阅前，请您先免费体验 1 个月。点击此处&nbsp;&nbsp;<a href='javascript:void(0)' id='switch_to_register'>免费体验&nbsp;&gt;</a></div>");  
          // switch to register
          $("#switch_to_register").click(function (){
            $("#login_box").fadeOut("fast");
            $("#register_box").fadeIn("fast"); 
            $("#login_warning_msg").text("");
            $("#login_tel").val("");
            $("#register_tel").val(tel_num);
          });
          return false;
        }

        // request for sms code
        var url = "/users/wbzx_sms_code";
        $.post(url,
        {
          tel: tel_num,
          sms_code_type: 1
        },
        function(data, status)
        {
          if (data.err_code == 0)
          {
            $("#login_warning_msg").text("");
            count_down("#login_sms_verifiy", "#login_sms_verifiy_span", 60);
          }
          else
          {
            $("#login_warning_msg").text("短信发送失败，请稍后尝试或联系管理员");
          }
        }).error(function()
        {
          $("#login_warning_msg").text("短信发送失败，请稍后尝试或联系管理员");
        });
      });
    }
  });

  $("#loginbtn").click(function()
  {
    var url = "/users/wbzx_login";
    var tel_num = $("#login_tel").val();
    var code = $("#login_code").val();

    var code_format = /^\d{4}$/;
    if ( !code_format.test(code) || code.length != 4)
    {
      $("#login_warning_msg").text("短信验证码格式不正确，请您重新输入");
      return false;
    }

    $.post(url,
    {
      tel: tel_num,
      code: code
    },
    function(data, status)
    {
      if (data.err_code == 0)
      {
        $("#login_warning_msg").text("登录成功！正在进入系统，请稍侯片刻...");
        sessionStorage.setItem("mobile", tel_num);
        var dt = sessionStorage.getItem("mobile");
        //console.log(dt);
        //添加key-value 数据到 sessionStorage
        sessionStorage.setItem("session_key", data.login_info.session_key);
        //通过key来获取value
        var dt = sessionStorage.getItem("session_key");
        //console.log(dt);
        //清空所有的key-value数据。
        //localStorage.clear();
        window.setTimeout(function(){
            window.location = './product-search.html';
        }, 1000);
      }
      else
      {
        $("#login_warning_msg").text("短信验证码不正确，请您重新输入");
      }
    });
  });

  //注册的事儿
  $("#register_sms_verifiy").click(function(){
    var tel_format = /^1\d{10}$/;
    var tel_num = $("#register_tel").val();
    var number_status = 1;
    if ( !tel_format.test(tel_num) || tel_num.length != 11)
    {
      $("#register_warning_msg").text("手机号码不正确，请您重新输入");
      // $("#register_warning_msg").css({ color: 'red' });
    }
    else
    {
      // verify this phone number
      var url = "/users/verify_tel";
      $.post(url,
      {
        tel: tel_num
      },
      function(data, status)
      {
        number_status = data.ret.tel_available;
        if (number_status == 0)
        {
          $("#register_warning_msg").html("您已订阅了我们的服务，请直接登录。点击此处&nbsp;<a href='javascript:void(0)' id='switch_to_login'>登录&nbsp;</a>");  
          // switch to register
          $("#switch_to_login").click(function (){
            $("#register_box").fadeOut("fast");
            $("#login_box").fadeIn("fast");
            $("#register_warning_msg").text("");
            $("#register_tel").val("");
            $("#login_tel").val(tel_num);
          });
          return false;
        }

        // requst for sms code
        var url = "/users/wbzx_sms_code";
        $.post(url,
        {
          tel: tel_num,
          sms_code_type: 0
        },
        function(data, status)
        {
          if (data.err_code == 0)
          {
            $("#register_warning_msg").text("");
            count_down("#register_sms_verifiy", "#register_sms_verifiy_span", 60);
          }
          else
          {
             $("#register_warning_msg").text("短信发送失败，请稍后尝试或联系管理员");
          }
        }).error(function()
        {
          $("#register_warning_msg").text("短信发送失败，请稍后尝试或联系管理员");
        });
      });
    }
  });

  $("#registerbtn").click(function()
  {
    var url = "/users/wbzx_register";
    var tel_num = $("#register_tel").val();
    var code = $("#register_code").val();

    var code_format = /^\d{4}$/;
    if ( !code_format.test(code) || code.length != 4)
    {
      $("#register_warning_msg").text("短信验证码格式不正确，请您重新输入");
      return false;
    }
    
    $.post(url,
    {
      tel: tel_num,
      code: code
    },
    function(data, status)
    {
      if (data.err_code == 0)
      {
        $("#register_warning_msg").text("申请成功！马上开始体验，请稍侯片刻...");
        sessionStorage.setItem("mobile", tel_num);
        var dt = sessionStorage.getItem("mobile");
        //console.log(dt);
        //添加key-value 数据到 sessionStorage
        sessionStorage.setItem("session_key", data.register_info.session_key);
        //通过key来获取value
        var dt = sessionStorage.getItem("session_key");
        //console.log(dt);      
        //清空所有的key-value数据。
        //localStorage.clear();
        setTimeout(function () {
            window.location = './product-search.html';
        }, 1000);
      }
      else
      {
        $("#login_warning_msg").text("短信验证码不正确，请您重新输入");
      }
    });
  });

  function count_down(hide_id, show_id, count_down_timer)
  {
    $(hide_id).css({display:"none"});
    $(show_id).css({display:"block"});
    $(show_id).text(--count_down_timer + "秒后再次发送");
    var new_timer = window.setInterval(function()
    {
      if (count_down_timer > 0)
      {
        $(show_id).text(--count_down_timer + "秒后再次发送");
      }
      else
      {
        $(show_id).css({display:"none"});
        $(hide_id).css({display:"block"});
        window.clearInterval(new_timer);
      }
    }, 1000); 
  }

});
