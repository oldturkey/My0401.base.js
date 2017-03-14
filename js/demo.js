$(function(){
    //个人中心的下拉菜单
   $('#header .member').hover(function () {
		//$().getClass('member').css('background', 'url(images/arrow2.png) no-repeat 55px center');
		//this.css('color', 'red');
		$(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
		$('#header .member_ul').show().animate({
            t:30,
            step:10,
            mul:{
                o:100,
                h:120
            }
        });
	}, function () {
		//$().getClass('member').css('background', 'url(images/arrow.png) no-repeat 55px center');
		$(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
		$('#header .member_ul').animate({
            //完成了同步动画和队列动画并解决了问题之后，可以是实现下拉菜单收缩的效果
            t:30,
            step:10,
            mul:{
                o:0,
                h:0
            },
            fn:function(){
                $('#header .member_ul').hide();
            }
        });
	});
    //注册框
    var reg=$('#reg');
    var screen=$('#screen');
    reg.center(600,550);
    $().resize(function(){
        reg.center(600,550);
        if(reg.css('display')=='block'){
            screen.lock();
            };
    });
    $('#header .reg').click(function(){
        reg.center(600,550).css('display','block');
        screen.lock().animate({
            attr:'o',
            target:30,
            t:30,
            step:10
        });
    })
    $('#reg .close').click(function(){
        reg.css('display','none');
        screen.unlock().animate({
            attr:'o',
            target:0,
            t:30,
            step:10
        });
    });
    
    //表单验证
    $('form').form('user').bind('focus', function () {
		$('#reg .info_user').css('display', 'block');
		$('#reg .error_user').css('display', 'none');
		$('#reg .succ_user').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_user').css('display', 'none');
			$('#reg .error_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else if (!/^[a-zA-Z0-9_]{2,20}$/.test(trim($(this).value()))) {
			$('#reg .error_user').css('display', 'block');
			$('#reg .info_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else {
			$('#reg .succ_user').css('display', 'block');
			$('#reg .error_user').css('display', 'none');
			$('#reg .info_user').css('display', 'none');
		}
	});
    //密码验证功能
     $('form').form('pass').bind('focus', function () {
         $('#reg .info_pass').css('display', 'block');
		$('#reg .error_pass').css('display', 'none');
		$('#reg .succ_pass').css('display', 'none');
        }).bind('blur', function () {
         if (trim($(this).value()) == '') {
             $('#reg .info_pass').css('display', 'none');
         }else{
             if(check_pass(this)){
                  $('#reg .info_pass').css('display', 'none');
		          $('#reg .error_pass').css('display', 'none');
		          $('#reg .succ_pass').css('display', 'block'); 
             }else{
                 $('#reg .info_pass').css('display', 'none');
		          $('#reg .error_pass').css('display', 'block');
		          $('#reg .succ_pass').css('display', 'none'); 
             }
         }
         });
    //验证密码强度
    $('form').form('pass').bind('keyup',function(){
        check_pass(this);
    });
    //密码验证函数
    function check_pass(_this){
        var code_length=0;//每次触发事件都会有一个计数器，来统计不同类型数据的个数
        var value=trim($(_this).value());
        var value_length=value.length;
        //最开始打算写在外面，但是考虑到全局变量会污染全局环境，可能和其他业务逻辑变量重名，所以要封装成函数
        var flag=false;
        //第一个条件，输入的值大于6位小于20位
        if(value_length>=6&&value_length<=20){
            $('#reg .info_pass .q1').html('●').css('color','green');
        }else{
            $('#reg .info_pass .q1').html('○').css('color','#666');
        }
         //第二个条件，不能有非空字符，不能为空
        if(value_length>0&&(!/\s/.test(value))){
            $('#reg .info_pass .q2').html('●').css('color','green');
        }else{
            $('#reg .info_pass .q2').html('○').css('color','#666');
        }
        
        if(/[\d]/.test(value)){
            code_length++;
        }
        if(/[a-z]/.test(value)){
            code_length++;
        }
        if(/[A-Z]/.test(value)){
            code_length++;
        }
        if(/[^\w]/.test(value)){
            code_length++;
        }
        //第三个条件  大、小写字母、数字、非空字符，至少两种
        if(code_length>=2){
           $('#reg .info_pass .q3').html('●').css('color','green'); 
        }else{
            $('#reg .info_pass .q3').html('○').css('color','#666');
        }
        
        //安全级别
        if(value.length>=10&&code_length>=3){
            $('#reg .info_pass .s1').css('color','green');
            $('#reg .info_pass .s2').css('color','green');
            $('#reg .info_pass .s3').css('color','green');
           $('#reg .info_pass .s4').html('高').css('color','green');
        }else if(value.length>=8&&code_length>=2){
            $('#reg .info_pass .s1').css('color','#f60');
            $('#reg .info_pass .s2').css('color','#f60');
            $('#reg .info_pass .s3').css('color','#ccc');
            $('#reg .info_pass .s4').html('中').css('color','f60');
        }else if(value.length>=1){
            $('#reg .info_pass .s1').css('color','maroon');
            $('#reg .info_pass .s2').css('color','#ccc');
            $('#reg .info_pass .s3').css('color','#ccc');
            $('#reg .info_pass .s4').html('低').css('color','maroon');
        }else{
            $('#reg .info_pass .s1').css('color','#ccc');
            $('#reg .info_pass .s2').css('color','#ccc');
            $('#reg .info_pass .s3').css('color','#ccc');
            $('#reg .info_pass .s4').html('');
        }
        if(code_length>=2&&value_length>=6&&value_length<=20&&(!/\s/.test(value)))return flag=true;
    }
    
    //密码再次确认
    $('form').form('notpass').bind('focus', function () {
         $('#reg .info_notpass').css('display', 'block');
		$('#reg .error_notpass').css('display', 'none');
		$('#reg .succ_notpass').css('display', 'none');
        }).bind('blur', function () {
        if (trim($(this).value()) == '') {
             $('#reg .info_notpass').css('display', 'none');
         }else if(trim($(this).value())==trim($('form').form('pass').value())){
             $('#reg .info_notpass').css('display', 'none');
             $('#reg .error_notpass').css('display', 'none');
		     $('#reg .succ_notpass').css('display', 'block');
         }else{
             $('#reg .info_notpass').css('display', 'none');
             $('#reg .error_notpass').css('display', 'block');
		     $('#reg .succ_notpass').css('display', 'none');
         }
    });
    
    //回答验证
    $('form').form('ans').bind('focus', function () {
         $('#reg .info_ans').css('display', 'block');
		$('#reg .error_ans').css('display', 'none');
		$('#reg .succ_ans').css('display', 'none');
        }).bind('blur', function () {
        if (trim($(this).value()) == '') {
             $('#reg .info_ans').css('display', 'none');
         }else if(trim($(this).value()).length>=2&&trim($(this).value()).length<=32){
             $('#reg .info_ans').css('display', 'none');
             $('#reg .error_ans').css('display', 'none');
		     $('#reg .succ_ans').css('display', 'block');
         }else{
             $('#reg .info_ans').css('display', 'none');
             $('#reg .error_ans').css('display', 'block');
		     $('#reg .succ_ans').css('display', 'none');
         }
    });
    
    //电子邮件验证
    $('form').form('email').bind('focus', function () {
        //补全界面
        if($(this).value().indexOf('@')==-1)$('#reg .all_email').css('display','block');
        
         $('#reg .info_email').css('display', 'block');
		$('#reg .error_email').css('display', 'none');
		$('#reg .succ_email').css('display', 'none');
        }).bind('blur', function () {
        $('#reg .all_email').css('display','none');
        
        if (trim($(this).value()) == '') {
             $('#reg .info_email').css('display', 'none');
         }else if(/^\w+@[0-9a-z]+(\.[a-z]{2,4}){1,2}$/.test(trim($(this).value()))){
             $('#reg .info_email').css('display', 'none');
             $('#reg .error_email').css('display', 'none');
		     $('#reg .succ_email').css('display', 'block');
         }else{
             $('#reg .info_email').css('display', 'none');
             $('#reg .error_email').css('display', 'block');
		     $('#reg .succ_email').css('display', 'none');
         }
    });
    
    //电子邮件键入功能
    $('form').form('email').bind('keyup',function(event){
        if($(this).value().indexOf('@')==-1){
            $('#reg .all_email').css('display','block');
            $('#reg .all_email li span').html($(this).value());
        }else{
            $('#reg .all_email').css('display','none');
        }    
        
            $('#reg .all_email li').css('background','none');
            $('#reg .all_email li').css('color','#666');
        
        if(event.keyCode==40){
           if(this.index==undefined||this.index>=$('#reg .all_email li').length()-1){
               this.index=0;
           }else{
            this.index++;
               }
            //$('#reg .all_email li').css('background','none');
            //$('#reg .all_email li').css('color','#666');
            $('#reg .all_email li').eq(this.index).css('background','#e5edf2');
            $('#reg .all_email li').eq(this.index).css('color','#369'); 
        }
        
        if(event.keyCode==38){
           if(this.index==undefined||this.index<=0){
               this.index=$('#reg .all_email li').length();
           }else{
            this.index--;
               }
            //$('#reg .all_email li').css('background','none');
            //$('#reg .all_email li').css('color','#666');
            $('#reg .all_email li').eq(this.index).css('background','#e5edf2');
            $('#reg .all_email li').eq(this.index).css('color','#369'); 
        }
        
        if(event.keyCode==13){
            $(this).value($('#reg .all_email li').eq(this.index).text());
            $('#reg .all_email').css('display','none');
            this.index=undefined;
        }
    });
    
    //电子邮件补全系统点击获取
    //点击事件是鼠标点击弹起后才触发，而blur在失去焦点后就会触发隐藏，导致点击事件失效
     /*$('#reg .all_email li').click(function(){
         alert('');
     });*/
    $('#reg .all_email li').bind('mousedown',function(){
        $('form').form('email').value($(this).text());
    });
     
    //电子邮件补全系统，鼠标移入移出效果
    $('#reg .all_email li').hover(function(){
        $(this).css('background','#e5edf2');
        $(this).css('color','#369');     
    },function(){
       $(this).css('background','none');
        $(this).css('color','#666'); 
    });
    //登陆框
    var login=$('#login');
    var screen=$('#screen');
    login.center(250,350);
    $().resize(function(){
        login.center(250,350);
        if(login.css('display')=='block'){
            screen.lock();
            };
    });
    $('#header .login').click(function(){
        login.center(250,350).css('display','block');
        screen.lock().animate({
            attr:'o',
            target:30,
            t:30,
            step:10
        });
    })
    $('#login .close').click(function(){
        login.css('display','none');
        screen.unlock().animate({
            attr:'o',
            target:0,
            t:30,
            step:10
        });
    });
    
    //拖拽 
    login.drag($('#login h2').first());
    reg.drag($('#reg h2').first());
    
    //百度分享初始位置
    $('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');  
    $(window).bind('scroll',function(){
        $('#share').animate({
            attr:'y',
            target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
        });
    });
    //百度分享收缩效果
    $('#share').hover(function(){
        $(this).animate({
            attr:'x',
            target:0
        });
    },function(){
        $(this).animate({
            attr:'x',
            target:-211
        });
    });
    
  //滑动导航栏特效
    $('#nav .about li').hover(function(){
        var target=$(this).first().offsetLeft;
        $('#nav .nav_bg').animate({
            attr:'x',
            target:target+20,
            t:30,
            step:10,
            fn:function(){
                $('#nav .white').animate({
                   attr:'x',
                    target:-target
                });
            }
        });
    },function(){
        $('#nav .nav_bg').animate({
            attr:'x',
            target:20,
            t:30,
            step:10,
            fn:function(){
               $('#nav .white').animate({
                   attr:'x',
                    target:0
                }); 
            }
        });
    });
    
    //侧边栏菜单切换
    $('#sidebar h2').toggle(function(){
        $(this).next().animate({
           mul:{
                h : 0,
				o : 0
            }
        });
    },function(){
        $(this).next().animate({
            mul:{
                h:150,
                o:100
            }
        });
    });
    
    
});





/*
window.onload = function () {
	//个人中心的下拉菜单
	$().getClass('member').hover(function () {
		//$().getClass('member').css('background', 'url(images/arrow2.png) no-repeat 55px center');
		//this.css('color', 'red');
		$(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
		$().getClass('member_ul').show();
	}, function () {
		//$().getClass('member').css('background', 'url(images/arrow.png) no-repeat 55px center');
		$(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
		$().getClass('member_ul').hide();
	});
     
    var login=$().getId('login');
    var screen=$().getId('screen');
    login.center(250,350);
    $().resize(function(){
        login.center(250,350);
        if(login.css('display')=='block'){
            screen.lock();
            };
    });
    $().getClass('login').click(function(){
        login.center(250,350);
        login.css('display','block');
        screen.lock();
    })
    $().getClass('close').click(function(){
        login.css('display','none');
        screen.unlock();
    });
    
    
    
    
    
    login.drag([$().getTagName('h2').getElement(0),$().getTagName('span').getElement(0)]);
    
};*/
