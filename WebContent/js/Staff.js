$(function() {
	var index = 0;
	$(".left_btn").click(function() {
		index--;
		if(index < 0) {
			index = 3;
		}
		$(".item").eq(index).fadeIn().siblings().fadeOut();
	})
	$(".right_btn").click(function() {
		index++;
		if(index > 3) {
			index = 0;
		}
		$(".item").eq(index).fadeIn().siblings().fadeOut();

	})
	var Stop = window.setInterval(f, 1500);

	function f() {
		index++;
		if(index > 3) {
			index = 0
		}
		$(".item").eq(index).fadeIn().siblings().fadeOut();
	}
	$(".lr-table").mouseover(function() {
		clearTimeout(Stop);
	})
	//------左右控件暂停和播放轮播图----
	$(".lr-table").mouseleave(function() {
		Stop = window.setInterval(f, 1500);
	});
	$(".body_right_middle div").click(function() {
		var index = $(this).index();
		$(".body_right_middle div").eq(index).addClass("active").siblings().removeClass("active");
		$(".middle_item").eq(index).css("display", "block").siblings().css("display", "none");
	});
	$(".biaoqing").click(function() {
		$(".photo").css("display", "block");
	});
	//---清空留言栏提示信息 ----
	var flag=0;
	$("#body_bottom_right_txt").click(function(){
		var dele=document.getElementById("body_bottom_right_txt");
		if(flag==0){
			dele.innerHTML="";
		}
			flag=1;
	})
	$(".photo img").click(function() {
	//---点击添加相应表情。
		var shu = new Array('weixiao', 'wuzuixiao', 'chiya', 'daxiao', 'deyi', 'kenai', 'kun', 'se');
		var a = $(this).index();
		var sr = "img/" + shu[a] + ".gif";
		var txt = document.getElementById("body_bottom_right_txt");
		//---盛放文本和表情的容器选用可编辑型div，避免表情图片以文本形式展示。
		txt.innerHTML += "<img src='" + sr + "'>";
		$(".photo").css("display", "none");
	})
	$(".pu").mouseover(function() {
		var txt = document.getElementById("body_bottom_right_txt").innerHTML;
	  //---把div中的图片转化为字符存放在input标签中，方便留言文本往数据库存储；
		var out="" //用于装时间字符串
		var date= new Date();
		 out+=date.getMonth()+1+"月";  
		 out+=date.getDate()+"日";
		 out+=date.getHours()+"时";
		 out+=date.getMinutes()+"分"
		 out+=date.getSeconds()+"秒";
		 $(".DateTime").val(out);
		 txt= txt.replace(/草|日|操|fuck|逼|靠|傻|屌/gi, '**'); //正则过滤
		 $(".Txt").val(txt);
	});
	$(".pu").click(function(){

		var div=document.createElement("div");
				var p1=document.createElement("p");
				var a=document.createElement("a");
				a.appendChild(document.createTextNode("刚刚："));
				a.href="StaffInfo.html";
				p1.appendChild(a);
				div.appendChild(p1);
				var txt2=document.getElementById("body_bottom_right_txt").innerHTML;
				div.innerHTML+=txt2;
				var p2=document.createElement("p");
				var txt3=document.getElementById("DateTime").value;
				p2.appendChild(document.createTextNode(txt3));
				p2.className="Staff_p";
				div.appendChild(p2);
				div.className="Staff";
				var insert=document.getElementsByClassName('Staff')[0];
				//---使其保持最新发布的始终在上方。----
				document.getElementsByClassName("middle_item")[1].insertBefore(div,insert)
	})
//------以下为获取数据库中存放的用户留言数据---------
		//----学院公告留言数据获取---------------
		$.ajax({
		datatype:"json",
		type:"get",
		url:"MsgServlet",
		success:function(data){
			var data1=JSON.parse(data);
			for ( var i=data1.length-1;i>=0;i--) {
				var div=document.createElement("div");
				var p1=document.createElement("p");
				p1.appendChild(document.createTextNode(data1[i]["StaffName"]+"："))
				div.appendChild(p1);
				div.innerHTML+=data1[i]["Txt"];
				var p2=document.createElement("p");
				p2.className="Staff_p";
				p2.appendChild(document.createTextNode(data1[i]["DateTime"]));
				div.appendChild(p2);
				div.className="Staff";
				document.getElementsByClassName("middle_item")[0].appendChild(div);				
			}
		}	
	})
		//-------职工留言数据获取----
	$.ajax({
		datatype:"json",
		type:"post",
		url:"MsgServlet",
		success:function(data){
			var data1=JSON.parse(data);
			for ( var i=data1.length-1;i>=0;i--) {
				var div=document.createElement("div");
				var p1=document.createElement("p");
				p1.appendChild(document.createTextNode(data1[i]["StaffName"]+"："));
				div.appendChild(p1);
				div.innerHTML+=data1[i]["Txt"];
				var p2=document.createElement("p");
				p2.className="Staff_p";
				p2.appendChild(document.createTextNode(data1[i]["DateTime"]));
				div.appendChild(p2);
				div.className="Staff";
				document.getElementsByClassName("middle_item")[1].appendChild(div);				
			}
		}	
	});
	
});