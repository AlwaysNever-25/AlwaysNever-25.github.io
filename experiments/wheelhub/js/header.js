function dropdown(){
    var nav = document.getElementsByClassName("nav")[0];

    if(nav.className === "nav"){
    nav.className += " responsive";
    }else{
        nav.className = "nav";
    }
}