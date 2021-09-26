$(function(){
    var layer =layui.layer
    getUserinfo()
    $('#btnLogout').on('click',function(){
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
            //清除token 
            localStorage.removeItem('token')
            location.href='/login.html'
            
            layer.close(index);
          });
    })
})
// 获取用户基本信息
function getUserinfo(){
    var layer =layui.layer
    $.ajax({
        url:'/my/userinfo',
        method: 'GET',
        // headers: {Authorization:localStorage.getItem('token')||''},
        success: function(res) {
            if(res.status !== 0) {
                return layer.message('获取用户基本信息失败')
            }
            // 调用个人头像
            renderAvatar(res.data)
        
        }
       
    })
}
//渲染用户的个人头像
function renderAvatar(user){
    //获取用户昵称
    var name = user.username || user.nickname
    //渲染用户昵称
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    //获取用户的头像
    if(user.user_pic !== null ) {
        //渲染用户的头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else {
        $('.layui-nav-img').hide()
        // toUpperCase() 方法用于把字符串转换为大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
    

}