function rolada(max){
    let i = Math.floor((Math.random() * max) + 1)

    switch(max){
        case 4:
            document.getElementById("rolada4").innerHTML="D4: "+i
            break
        case 6:
            document.getElementById("rolada6").innerHTML="D6: "+i
            break
        case 8:
            document.getElementById("rolada8").innerHTML="D8: "+i
            break
        case 10:
            document.getElementById("rolada10").innerHTML="D10: "+i
            break
        case 12:
            document.getElementById("rolada12").innerHTML="D12: "+i
            break
        case 20:
            document.getElementById("rolada20").innerHTML="D20: "+i
            
    }
}