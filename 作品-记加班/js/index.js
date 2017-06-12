$(function(){
	$('.calendar').click(function(){
		window.location.href = "data.html";
	});
	$('.stat').click(function(){
		window.location.href = "stat.html";
	});
	
	//上方的考勤周期为当前月的第一天和当前月的最后一天
	var n = 0;
	var date = new Date();
	date.setDate(1);
	date.setMonth(date.getMonth()+n+1);
	date.setDate(0);
	var n2 = date.getDate();
	var m = date.getMonth()+1;
	$('.header h2').html('考勤周期'+m+'月01日-'+m+'月'+n2+'日');
	//获取到当前用户
	var usr = localStorage.getItem('user');
	//获取到当前用户的基本工资
	$.ajax({
		type:"get",
		url:globalUrl+"Dispose/basic_salary",
		async:true,
		//传入当前的用户
		data:{
			user:usr,
			//查询时有该项，添加时没有
			query:true
		},
		success:function(data){
			//小时工资
			var everyHour = parseFloat(((data[0].basic_salary)/21.75/8).toFixed(2));
			var dataArr = [];
			//请求当前用户的加班信息
			$.ajax({
				type:"get",
				url:globalUrl+"Dispose/get_data",
				async:true,
				data:{
					usr:usr
				},
				success:function(arr){
					//过滤出符合当前条件的数组
					var arr1 = arr.filter((e)=>{
						var str1 = parseInt(e.working_days.substring(5,7));
						return str1 == parseInt(m);
					});
					//用于存储符合条件的信息
					var arr2 =[];
					$.each(arr1, function(i,e) {
						arr2.push(Number(e.work_time))
					});
					var sub = eval(arr2.join('+'));
					//将数据渲染到当前的本月工作小时数的项目上
					$('.hfoot .num').eq(2).html(sub);
					$('.hfoot .num').eq(1).html(parseFloat(sub*everyHour).toFixed(2));
					$('.hfoot .num').eq(0).html(parseFloat((sub-100)*everyHour).toFixed(2));
				}
			});
		}
	});
	//console.log($('.header h2').html().substring(4,5))
	//如果当前没有缓存用户   那么h4的内容为“请登录”，点击直接跳转到登录页面
	if(usr){
		$('h4').html('欢迎<b>'+usr+'</b>来到记加班');
	}else{
		$('h4').html('请登录').css({
			"color":"red",   
			"font-size":".8rem"
		});
		$('h4').click(function(){
			window.location.href = "register.html";
		})
	}
	
})
