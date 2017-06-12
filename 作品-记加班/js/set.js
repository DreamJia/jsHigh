$(function(){
	$('.set_salary').click(function(){
		$(this).hide();
		$('.set_txt').show().addClass('animated fadeInDown');
	});
	var usr = localStorage.getItem('user');
	//初始化时先向数据库请求数据，讲基本工资渲染到输入框中  将基本工资渲染到右侧的p标签中
	$.ajax({
		type:"get",
		url:globalUrl+"Dispose/basic_salary",
		async:true,
		//传入当前的用户
		data:{
			user:usr,
			query:true
		},
		success:function(data){
			$('.set_salary .right').html(data[0].basic_salary+">");
			$('.set_salary .right').css({"color":"#000"})
			var everyHour = parseFloat(((data[0].basic_salary)/21.75/8).toFixed(2));;
			$('.hour_money .right').html(everyHour);
		}
	});
	//点击确定按钮,生成基本工资
	$('input[value=确定]').click(function(){
		if($('input[type=text]').val() == ''){
			alert('输入的基本工资不能为空')
		}else{
			var money = $('input[type=text]').val();
			
			//向数据库提交基本工资
			$.ajax({
				type:"get",
				url:globalUrl+"Dispose/basic_salary",
				async:true,
				data:{
					money:money,
					user:usr,
				},
				success:function(){
					//查询当前的基本工资
					$.ajax({
						type:"get",
						url:globalUrl+"/Dispose/basic_salary",
						async:true,
						data:{
							money:money,
							user:usr,
							//如果是查询数据需要输入此项，提交时不需要
							query:true
						},
						success:function(data){
							var everyHour = parseFloat(((data[0].basic_salary)/21.75/8).toFixed(2));;
							$('.hour_money .right').html(everyHour);
						}
					});
				}
			});
		}
	});
})
