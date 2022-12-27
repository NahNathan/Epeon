function rolada(){
    let i = Math.floor((Math.random() * 20) + 1)

    if(i<10)
        document.getElementById("rolada").innerHTML="Rode um dado   :"+i
    else
        document.getElementById("rolada").innerHTML="Rode um dado:"+i
    console.log("CLICADO!!")
}