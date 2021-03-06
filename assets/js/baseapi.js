//用ajaxPrefilter统一拼接请求的根路径
$.ajaxPrefilter(function(options){
    //在发起真正的ajax请求前，统一拼接根路径
    
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url
    //统一为有权限的接口设置headers请求头
    ///my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
    if(options.url.indexOf('/my/')!==-1) {
        options.headers = {Authorization:localStorage.getItem('token')||''}
    }
    //控制用户的访问权限
    
        

    options.complete = function(res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        // 1. 强制清空 token
        localStorage.removeItem('token')
        // 2. 强制跳转到登录页面
        location.href = '/login.html'
        }
    }
})