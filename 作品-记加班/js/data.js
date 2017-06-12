window.onload = function(){
	const prev = document.getElementById('prev');
	const next = document.getElementById('next');
	const em = document.getElementsByTagName('em')[0];
	const day = document.getElementById('day');
	const shad = document.getElementsByClassName('shad')[0];
	
	//获取到存储区的用户
	var usr = localStorage.getItem('user');
	var n = 0;
	show();
	prev.onclick = function(){
		n--;
		show();
	}
	next.onclick = function(){
		n++;
		show();
	}
	
	var el= [];
	function show(){
		//获取到时间，并算出当前月的第一天是星期几,n1
		var date = new Date();
		date.setMonth(date.getMonth()+n);
		date.setDate(1);
		var n1 = date.getDay();
		if(n1 == 0){
			n1 = 7;
		}
		//本月有几天,n2
		var date = new Date();
		date.setDate(1);
		date.setMonth(date.getMonth()+n+1);
		date.setDate(0);
		var n2 = date.getDate();
		//上个月有几天，n4
		var date = new Date();
		date.setMonth(date.getMonth()+n);
		date.setDate(0);
		var n4 = date.getDate();
		//今天是几号，n3
		var date = new Date();
		date.setMonth(date.getMonth()+n);
		var n3 = date.getDate();
		em.innerHTML = date.getFullYear()+'年'+'0'+(date.getMonth()+1)+'月';
		//截取到当前页面的月份
		var numzz = em.innerHTML.substring(5,7);
		var str = '';
		//当前月之前的月份不渲染
		for(var i=n4-n1+2;i<=n4;i++){
			str += '<li></li>';
		}
		//页面初始化即想数据库请求数据，渲染页面
		$.ajax({
			type:"get",
			url:globalUrl+"Dispose/get_data",
			async:true,
			//传入当前的用户
			data:{
				usr:usr
			},
			success:function(data){
				var arr = data.filter((e)=>{
						var str1 = e.working_days.substring(5,7);
						return str1==numzz;
					}
				);
				var arr1 = [];
				arr.filter((e)=>{
					var str2 = e.working_days.substring(8,10);
					arr1.push(str2);
				});
				for(var i=1;i<=n2;i++){
					str += '<li><i>'+i+'</i><br><em></em><br><b></b></li>';	
				}
				//当前月之后的月份不渲染
				for(var i=n1+n2;i<=35;i++){
						str += '<li></li>';
				}
				//渲染页面
				day.innerHTML = str;
				var lis = day.getElementsByTagName('li');
				for(var i=0;i<lis.length;i++){
					for(var j=0;j<arr1.length;j++){
						if(lis[i].getElementsByTagName('i')[0]){
							if(parseInt(lis[i].getElementsByTagName('i')[0].innerText) == parseInt(arr1[j])){
								lis[i].getElementsByTagName('em')[0].innerHTML = arr[j].shift+'班';
								lis[i].getElementsByTagName('b')[0].innerHTML = arr[j].work_time+'h';
							}
						}
					}
					
					if(n<0){
						lis[i].className = 'gray';
					}else if(n==0){
						if(i < n3+n1-2){
							lis[i].className += ' gray';
						}else if(i == n3+n1-2){
							lis[i].className += ' active';
						}
					}
					//当前月之前和当前月之后的日期不可点击 
					if(lis[i].innerHTML != ''){
						lis[i].onclick = function(){
							$('.shad').show().addClass('animated bounceIn').removeClass('bounceOut');
							$('.rh>span').html($('em').html()+$(this).find('i').html()+'日');
							el[0] = $(this).index();
						}
					}
					
				}
			}
		});
	}
	//点击取消当前页面的操作
	$('.save input[value=取消]').click(function(){
		$('.shad').removeClass('bounceIn').addClass('bounceOut');
	});
	//存储当前设置的小时数
	var num = 0; 
	//选择当前天工作的小时数
	$('ol li').click(function(){
		$(this).addClass('light').siblings().removeClass('light');
		num = $(this).text();
	});
	//班别
	var shift = '';
	//点击选择班别   选择工作的班次  白班 中班 夜班
	$('.class_choose').click(function(){
		$('.shift').show().removeClass('fadeOut').addClass('animated fadeIn');
		$('.shift p').click(function(){
			$(this).addClass('light').siblings().removeClass('light');
			$('.class_choose em').html($(this).html()+'>');
			shift = $('.class_choose em').html().substring(0,1);
			$('.shift').hide().removeClass('fadeIn').addClass('animated fadeOut');
			//console.log(shift)
		});
		$('.shift input[value=取消]').click(function(){
			$('.shift').hide().removeClass('fadeIn').addClass('animated fadeOut');
		})
	});
	
	//点击保存 当前设置的数据,并向数据库提交一条数据
	$('input[value=保存]').click(function(){
		$('ul li').eq(el[0]).find('b').html(num+'h');
		$('ul li').eq(el[0]).find('em').html(shift+'班');
		$('.shad').removeClass('bounceIn').addClass('bounceOut');
		var _date =$('.rh>span').text().split('年').join('-').split('月').join('-').split('日').join('');
		//data:上传日期     hours:工作时间   classes:班别
		var obj = {
			date:_date,
			hours:num,
			classes:shift,
			user:usr
		}
		//向数据库提交数据
		$.get(globalUrl+'Dispose/work_time',obj,function(res){
			// console.log(res)
		});
		
	});
	//点击上方删除图标,删除当天所设置的数据信息
	$('.delete').click(function(){
		$('ul li').eq(el[0]).find('b').html('');
		$('.shad').removeClass('bounceIn').addClass('bounceOut');
	});
	
}

