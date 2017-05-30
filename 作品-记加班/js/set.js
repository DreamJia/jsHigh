$(function(){
	$('.set_salary').click(function(){
		$(this).hide();
		$('.set_txt').show().addClass('animated fadeInDown');
	});
	//点击确定按钮,生成基本工资
	$('input[value=确定]').click(function(){
		if($('input[type=text]').val() == ''){
			alert('输入的基本工资不能为空')
		}else{
			arr[0].money = $('input[type=text]').val();
			var everyHour = parseFloat(((arr[0].money)/21.75/8).toFixed(2));
			$('.hour_money .right').html(everyHour);
		}
	});
})
