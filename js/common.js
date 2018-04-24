var URL='https://www.wanbaolife.com';

function wbzx_log_out() 
{
    var session_key = sessionStorage.getItem("session_key");
    sessionStorage.removeItem('userinfo');
    var url = URL + '/users/wbzx_logout';
    $.post(url, 
    {
        session_key: session_key
    }, function (data, stauts) 
    {
        if (data.err_code == 0) 
        {
            sessionStorage.removeItem('session_key');
            sessionStorage.removeItem('mobile');
            window.location = 'index.html';
        }
    });
}
