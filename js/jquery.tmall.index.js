$(document).ready(function(){
	$("img").lazyload({placeholder:'../../images/icon_wait.gif'});
	changePic("#banner-women-clothes-div");//大幻灯片默认展示
	$(document).scroll(function(){
		/*固定的搜索栏*/
		if($(window).scrollTop()>=716){//还可以指定滚动条滚动到哪里
			$("#J_AttachedSearchContainer form").show();
			$("#J_AttachedSearchContainer").slideDown("fast");
		}else{
			$("#J_AttachedSearchContainer form").hide();
			$("#J_AttachedSearchContainer").slideUp("fast");
		}
	});

	$(".drop-down-list").hover(function(){
		$(this).children(".toggle-div").toggle();
	});
	$(".menu-nav-container-ul li").mouseenter(function(){
		$(this).children(".prosmore").stop();
		$(this).children(".prosmore").fadeIn();
		$(this).addClass("bg-red");
		$(this).css("padding-left","55px");

		var li_id=$(this).attr("id");
		if(li_id){
			/*图片从大变小的动画效果*/
			var div_id="#"+li_id+"-div";
			changePic(div_id);
		}
	});
	$(".menu-nav-container-ul li").mouseleave(function(){
		$(this).children(".prosmore").stop();
		$(this).children(".prosmore").fadeOut();
		$(this).removeClass("bg-red");
		$(this).css("padding-left","50px");

	});
	$(".floor-show-third ul li").mouseenter(function(){
		$(this).children("img").clearQueue();
		$(this).children("img").animate({padding:'0px'},300);
	});
	$(".floor-show-third ul li").mouseleave(function(){
		$(this).children("img").clearQueue();
		$(this).children("img").animate({padding:'0px 0px 0px 4px'},300);
	});

	$(".brand-rec-nav li").hover(function(){
		$(this).toggleClass("selected");
	});
	/*小的滑动的幻灯片begin*/
	$(".brand-slide-bg").children().bind('webkitAnimationStart', function() {
       $(this).parent(".brand-slide-bg").attr("is-animating","true");     
    });
    $(".brand-slide-bg").children().bind('webkitAnimationEnd', function() {
        $(this).removeClass("moveFromRight");
        $(this).removeClass("moveFromLeft");
        if($(this).hasClass("moveToLeft") || $(this).hasClass("moveToRight")){
            $(this).removeClass("page-current");
        } 
        $(this).removeClass("moveToLeft");
        $(this).removeClass("moveToRight");
        $(this).parent(".brand-slide-bg").attr("is-animating","false");       
    });
	$(".arrow-right").click(function() {
        slide_div=$(this).siblings(".brand-slide-content").children(".brand-slide-bg");
        moveLittlePage(slide_div,"right","moveFromLeft","moveToRight");       
    });
    $(".arrow-left").click(function() {
        slide_div=$(this).siblings(".brand-slide-content").children(".brand-slide-bg");
        moveLittlePage(slide_div,"left","moveFromRight","moveToLeft");       
    });
	/*小的滑动的幻灯片end*/

	$(".brand-slide-bg").bind('webkitTransitionEnd', function(){
		index=$(this).attr("index");
		if(index==4){
			index=1;
			$(this).css("-webkit-transition-duration","0s");
			$(this).css("-webkit-transform","translate3d(-100px,0,0)");
			$(this).attr("index",index);
		}
	});
	autoMove();
});
	/*自定义函数*/

function changePic(div_id){
/*切换首页大幻灯片*/
	$("div .banner-father").hide();
	var BC=$(div_id).children("div.banner-container");//只是图片部分
	var BCImg=BC.find("img");
	var BCEm=BC.find("em");
	if (BCImg.length==0) {//容错
		console.warn(div_id+" .banner-container.img not exsits");
		return;
	};
	/*展示前样式准备*/
	var father_bgColor = $(div_id).attr("bgColor");
	$("#fp-category-menu").css("background-color",father_bgColor);
	//BCImg.css("display","none");
	BCImg.css("width","840px");/*为了有缩小效果，设置为超宽超长的值*/
	BCImg.css("height","510px");

	/*展示div*/
	$(div_id).show();//small-banner先展示
	/*图片从打变小*/
	BCImg.stop();//jquery的动画容易造成排列现象，导致图片切换不流畅或者出bug，记得清除队列.stop和animate的区别。animate还是会执行回调函数，stop连回调函数都不执行了
	BCImg.animate({
		width:'810px',//这里如果换成-=30px,那么我乱晃的时候就会有bug，why
		height:'480px'
	},2500,function(){console.info(div_id)});
	/*右边小图片进入*/
	if(BCEm.length>0){
		BCEm.stop();
		BCEm.hide();
		BCEm.fadeIn(800);
	}
}
function autoMove(){
    moveLittlePage($(".brand-slide-bg").first(),"right","moveFromLeft","moveToRight");      
    moveLittlePage($(".brand-slide-bg").last(),"right","moveFromLeft","moveToRight");     
    autoTask=setTimeout("autoMove()",4000);
}
function moveLittlePage(slide_div,way,from_css,to_css){
	/*入参：slide_div 要滑动的元素所在的父元素
		   way： left或者right左边活着右边
		   from_css:上一个元素怎么做
		   to_css: 本元素怎么做
	*/
    if(slide_div.attr("is-animating")=="true"){return;}//动画未结束不能开始
    var current_css="page-current";
    var current_p=slide_div.children(".page-current");
    current_p.addClass(to_css);
    if(way=="left"){
        if (current_p.next().length<=0) {
            slide_div.children().first().addClass(from_css);
            slide_div.children().first().addClass(current_css);
        }else{
            current_p.next().addClass(from_css);
            current_p.next().addClass(current_css);
        }  
    }else if(way=="right"){
        if (current_p.prev().length<=0) {
            slide_div.children().last().addClass(from_css);
            slide_div.children().last().addClass(current_css);
        }else{
            current_p.prev().addClass(from_css);
            current_p.prev().addClass(current_css);
        }  
    }  
}