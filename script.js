function rolada(max){
    let i = Math.floor((Math.random() * max) + 1)


    if(max==4)
        document.getElementById("rolada4").innerHTML="D4-"+i
    else if(max==6)
        document.getElementById("rolada6").innerHTML="D6-"+i
    else if(max==8)
        document.getElementById("rolada8").innerHTML="D8-"+i

        
    else if(max==10){
        if(i==10)
            document.getElementById("rolada10").innerHTML="D10-"+i
        else
            document.getElementById("rolada10").innerHTML="D10---"+i
    }
        
    else if(max==12){
        if(i>9)
            document.getElementById("rolada12").innerHTML="D12-"+i
        else
            document.getElementById("rolada12").innerHTML="D12---"+i
    }

    else if(max==20){
        if(i>9)
            document.getElementById("rolada20").innerHTML="D20-"+i
        else
            document.getElementById("rolada20").innerHTML="D20---"+i
    }

    console.log("CLICADO!!")
}