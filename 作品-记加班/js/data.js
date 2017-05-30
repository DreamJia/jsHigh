window.onload = function(){
	const prev = document.getElementById('prev');
	const next = document.getElementById('next');
	const em = document.getElementsByTagName('em')[0];
	const day = document.getElementById('day');
	const shad = document.getElementsByClassName('shad')[0];
	var n = 0;
	prev.onclick = function(){
		n--;
		show();
	}
	next.onclick = function(){
		n++;
		show();
	}
	show();
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
		em.innerHTML = date.getFullYear()+'年'+(date.getMonth()+1)+'月';
		var str = '';
		for(var i=n4-n1+2;i<=n4;i++){
			str += '<li><i>'+i+'</i><b></b></li>';
		}
		for(var i=1;i<=n2;i++){
			str += '<li><i>'+i+'</i><b></b></li>';
		}
		for(var i=n1+n2;i<=35;i++){
				str += '<li><i>'+(i-n1-n2+1)+'</i><b></b></li>';
		}
		day.innerHTML = str;
		var lis = day.getElementsByTagName('li');
		
		for(var i=0;i<lis.length;i++){
			if(n<0){
				lis[i].className = 'gray';
			}else if(n==0){
				if(i < n3+n1-2){
					lis[i].className += ' gray';
				}else if(i == n3+n1-2){
					lis[i].className += ' active';
				}
			}
			lis[i].onclick = function(){
				$('.shad').show().addClass('animated bounceIn').removeClass('bounceOut');
				$('.rh>span').html($('em').html()+$(this).find('i').html()+'日');
				
				el[0] = $(this).index();
				
				
			}
		}
	}
	//点击取消当前页面的操作
	$('input[value=取消]').click(function(){
		$('.shad').removeClass('bounceIn').addClass('bounceOut');
	});
	//存储当前设置的小时数
	var num = 0; 
	//选择当前天工作的小时数
	$('ol li').click(function(){
		$(this).addClass('light').siblings().removeClass('light');
		num = $(this).text();
	});
	//点击保存 当前设置的数据
	$('input[value=保存]').click(function(){
		$('ul li').eq(el[0]).find('b').css('display','block').html(num+'h');
		$('.shad').removeClass('bounceIn').addClass('bounceOut');
	});
	//点击上方删除图标,删除当天所设置的数据信息
	$('.delete').click(function(){
		$('ul li').eq(el[0]).find('b').html('');
	})
	
}

