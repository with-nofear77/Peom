
layui.use(['layer','element','util','laypage'],function () {

    var $=layui.$,layer=layui.layer;
    var element=layui.element;
    util = layui.util;//引入util
    laypage=layui.laypage;

    util.fixbar({
        top:true
        , css: { right: 15, bottom: 35 }
        , bgcolor: '#19CAAD !important;display:block;'
        ,showHeight:100
        , click: function (type) {
            if (type === 'top') {
                $('.layui-body').animate({//主要代码
                    scrollTop: 0
                }, 200);
          }
      }
    });
    bk_img=['../static/bk_img/01.jfif','../static/bk_img/02.jfif','../static/bk_img/03.jpg','../static/bk_img/04.jpg',
    '../static/bk_img/05.jfif','../static/bk_img/06.jpg','../static/bk_img/07.jpg','../static/bk_img/08.jpg',
    '../static/bk_img/09.jfif','../static/bk_img/10.jpg','../static/bk_img/11.jfif','../static/bk_img/12.jfif',
    '../static/bk_img/13.jpg','../static/bk_img/14.jpg','../static/bk_img/15.jpg','../static/bk_img/16.jpg'];

    function flushPage(num,curr){
        layui.use(['laypage', 'layer'], function(){
        var laypage = layui.laypage,layer = layui.layer;
        laypage.render({
            elem: 'demo11'	//渲染的对象
            ,count: num		//注意这里的count是数据条数
            ,limit: 100		//每页显示8条数据
            ,curr : curr	//当前高亮页
            ,theme: '#1E9FFF'
            ,layout:['page','count']
            ,jump: function (obj, first) { //obj为当前页的属性和方法，第一次加载first为true
                //do SomeThing
                if (!first) {	//非首次加载
                    console.log(obj.curr);
                    getSongByPage(obj.curr);	//执行跳页方法，刷新显示内容，然后再在跳页方法中调用该方法，来改变总页数
                    //注意这里的总页数是，layui自己给我们算出来的，我们需要提供后台返回的总记录数，以及一页显示记录条数
                }
            }
            });
        });
    }
//Tab初始化唐代诗人
    var index =  layer.load(2,{ //icon支持传入0-2
            shade: [0.4, '#d0d0d0'], //0.5透明度的灰色背景
            offset: ['40%', '45%'], //位置
            content: '加载中...',
            success: function (layero) {
                layero.find('.layui-layer-content').css({
                    'color':'#fff',
                    'padding-top': '78px',
                    'padding-left': '13px',
                    'width': '60px',
                    'font-size':'16px'

                });
            }
        });
    getSongByPage(1);

    function getSongByPage(page) {
        if (page <= 0) {
            page = 1;
        }
        sql_page = (page - 1) * 100;
        $.ajax({
            url: "/look_all_poem_desty",
            type: "POST",
            data: {"page": sql_page},
            dataType: "json",
            async: true,
            success: function (res) {
                text = "";
                total_sum = res[0].sum;
                for (i = 0; i < res.length; i++) {
                    author = res[i].author;
                    desty = res[i].desty;
                    num = res[i].num;
                    text+="<a href='/tz_look_poem_desty/"+author+"'>" +
                        "                    <div class='layui-col-md2' style='margin: 10px 10px 10px 10px'>" +
                        "                    <span style='font-family:华文楷体;font-size: 16px'>"+author+"</span>" +
                        "                    <span style='font-size: 12px'>（"+num+"）</span>" +
                        "                    </div>" +
                        "                </a>"
                }
                    
                var songNum = total_sum;		//取出总记录数
                flushPage(songNum, page);
                $("#all_poem").html(text);
                layer.close(index);
            },
            error: function (e) {
                alert("出现错误！！");
            }
        });
    }

    //自定义每页条数的选择项
    // laypage.render({
    //     elem: 'demo11'
    //     ,count: 1000
    //     ,limit: 100
    //     ,limits: [100, 300, 500]
    // });


});
