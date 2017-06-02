function Mo(val,num){
	$.ajax({
		url:'http://api.douban.com/v2/movie/search?callback=?',
		dataType:'jsonp',
		data:{
			q:val,
			start:num,
			count:20
		},
		success:function(data){
			//给数组添加一个自定义属性
			data.len = Math.ceil(data.total/data.count);
			console.log(data)
			var $app = $('#app');
			var html = template('temp',data);
			$app.html(html);
		}
	})
};