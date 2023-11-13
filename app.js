var jet=document.getElementById("jet");

window.addEventListener("keydown",(e)=>{
    var left=parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if((e.key=="ArrowLeft" && left>0)){
        jet.style.left=left-10+"px";
    }
    // 460=> board width-jet width
    else if(e.key=="ArrowRight" && left<=460){
        jet.style.left=left+10+"px";
    }
    if(e.key=="ArrowUp" || e.keyCode==32) //32 is for space key
    {
        var bullet=document.createElement("div");
        bullet.classList.add("bullets");
        board.appendChild(bullet);
        var movebullet=setInterval(()=>{


            var rocks = document.getElementsByClassName("rocks");

            for(var i=0;i<rocks.length;i++){
                var rock =rocks[i];

                var rockbound=rock.getBoundingClientRect();
                var bulletbound=bullet.getBoundingClientRect();
                // condition to check whether the rock /alien and bullet are at the same postition
                // if so,then we have to destroy that rock
                if(bulletbound.left>=rockbound.left &&
                     bulletbound.right<=rockbound.right &&
                     bulletbound.top<=rockbound.top &&
                     bulletbound.bottom<=rockbound.bottom
                     ){
                        rock.parentElement.removeChild(rock); //just remove that particular rock;
                        // scoreboard
                        document.getElementById("points").innerHTML=parseFloat(document.getElementById("points").innerHTML)+1;
                
                
                    }
            }
            var bulletbottom=parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom")
            );
            //stop the bullet from moving outside the gamebox 
            if(bulletbottom>=500){
                clearInterval(movebullet);
            }



            bullet.style.left=left+"px";// bullet should aiways be placed at the top of my jet....
            bullet.style.bottom=bulletbottom+3+"px"
        });
    }
    
});




var generaterocks=setInterval(()=>{
    var rock =document.createElement("div");
    rock.classList.add("rocks");
    //just getting the legt of rock to place it in rendom position...
    var rockleft=parseInt(window.getComputedStyle(rock).getPropertyValue("left"));
    // generate value between 0 to 450 =>board width rock width
    rock.style.left=Math.floor(Math.random()*450)+"px";

    board.appendChild(rock);
},1500);

var moverock=setInterval(()=>{
    var rocks=document.getElementsByClassName("rocks");

    if(rocks!=undefined){
        for(var i=0;i<rocks.length;i++){
            // now I have to increase the top of each rock so that the rocks can move downwards...
            var rock =rocks[i]; //getting each rock
            var rocktop=parseInt(
                window.getComputedStyle(rock).getPropertyValue("top")
            );
            // 475 => boardheight-rockheight+25
            if(rocktop>=475){
                alert("Game Over!!!! reload");
                clearInterval(moverocks);
                window.location.reload();

            }
            rock.style.top=rocktop+25+"px";
        }
    }
},500);