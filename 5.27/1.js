var lis = document.getElementById('ul1').getElementsByTagName('li');
var ul2 = document.getElementById('ul2');
var arr = localStorage.getItem('shopping')?JSON.parse(localStorage.getItem('shopping')):[];
for(var i=0;i<lis.length;i++){
	lis[i].onclick = function(){
		if(!arr.includes(this.innerHTML)){
			arr.push(this.innerHTML);
			console.log(arr)
			localStorage.setItem('shopping',JSON.stringify(arr));
		}
	}
}
window.addEventListener('storage',function(){
	arr = localStorage.getItem('shopping')?JSON.parse(localStorage.getItem('shopping')):[];
	createLi();
});
//渲染结构
function createLi(){
	var str = '';
	arr.forEach(function(a,b){
		str += `<li>${a}<li/>`;
		console.log(str);
		
	})
	ul2.innerHTML = str;
	
}
