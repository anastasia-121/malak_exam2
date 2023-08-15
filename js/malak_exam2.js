document.addEventListener("DOMContentLoaded", function(event){
	document.querySelector("#item1").addEventListener("click", function() {
		loadItem("data/chicken.json");
	});
	document.querySelector("#item2").addEventListener("click", function() {
		loadItem("data/Beef.json");
	});
	document.querySelector("#item3").addEventListener("click", function() {
		loadItem("data/Sushi.json");
	});
});

function loadItem(jsonUrl){
  //Call server to get the entriy and the items
  var item=null;
  var xttp=new XMLHttpRequest();
  xttp.onreadystatechange=function(){
    if((this.readyState==4)&&(this.status==200)){
      item = this.responseText;
      var xttp=new XMLHttpRequest();
      xttp.onreadystatechange=function(){
        if((this.readyState==4)&&(this.status==200)){
          var entry= JSON.parse(this.responseText);
          document.querySelector("#content").innerHTML=
            '';
          entry.forEach(i => {
            let newitem = item.replace(new RegExp("{{name}}", "g"), i.name);
            newitem = newitem.replace(new RegExp("{{description}}", "g"), i.description);
                 
            document.querySelector("#content").innerHTML+=newitem;
            console.log(i.name);
            console.log(i.description);
     
          });			   
        }
      };
        xttp.open("GET", jsonUrl, true);
        xttp.send(null);//for POST only 
      
    }
  };
  xttp.open("GET", "templates/item.html", true);
  xttp.send(null);//for POST only
}
