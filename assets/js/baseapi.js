//用ajaxPrefilter统一拼接请求的根路径
$.ajaxPrefilter(function(options){
    //在发起真正的ajax请求前，统一拼接根路径
    // console.log(options.url); 
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url
})