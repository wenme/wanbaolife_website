/**
 * Created by Hoodps on 2017/11/20.
 */
var URL='https://www.wanbaolife.com';

$(document).on('click', '.logout', function () {

    layer.confirm('确认退出登录？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        var session_key = sessionStorage.getItem("session_key");
        sessionStorage.removeItem('userinfo');
         var newUrl = URL + '/users/wbzx_logout';
        $.post(newUrl, {
            session_key: session_key
        }, function (data, stauts) {
            if (data.err_code == 0) {
                layer.msg('退出登录成功', {icon: 1});
                sessionStorage.removeItem('session_key');
                sessionStorage.removeItem('mobile');
                window.location = '/index.html';
            }


        });

    });
});
