const $txt = $('#txt'),
$app = $('#app'),
$temp = $('#temp'),
$btn = $('#btn');
var num = 0;
$btn.click(function(){
	let val = $txt.val();
	$temp.html(View());
	Mo(val,num);
});
$('#app').on('click','a',function(ev){
	num = (ev.target.innerHTML-1)*20;
	$temp.html(View());
	Mo($txt.val(),num);
})
