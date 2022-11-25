 /*
 minesweeper.js
 Lauren Workosky
 lnw223
 */

 $(() => {
    let xdim = 0;
    let ydim = 0;
    let mines = 0;
    let start = false;
    let gameover = false;
    let flag = false;

    const deltaX = [0, 1, 1, 1, 0, -1, -1, -1];
    const deltaY = [1, 1, 0, -1, -1, -1, 0, 1];

    let spots = new Object();

    class Spot{
        constructor(id, xcoord, ycoord, val, uncovered, flagged){
            this.id = id;
            this.xcoord = xcoord;
            this.ycoord = ycoord;
            this.val = val;
            this.uncovered = uncovered;
            this.flagged = flagged;
          }
    }

    $("#reset").on("click", function(){
        spots = new Object();
        start = false;
        gameover = false;
        if($('#difficulty').val() == "easy"){
            xdim = 9;
            ydim = 9;
            mines = 10;
        } else if ($('#difficulty').val() == "medium"){
            xdim = 16;
            ydim = 16;
            mines = 40;
        } else {
            xdim = 16;
            ydim = 30;
            mines = 99;
        }
        makeGrid();
    });


    $("#flag").on("click", function(){
        if(start){
            if(flag){
                flag = false;
                document.getElementById("flag").style.backgroundColor = "#f2f2f2";
            } else {
                flag = true;
                document.getElementById("flag").style.backgroundColor = "red";
            }
        }
    });


    function makeGrid(){
        let oldGrid = document.getElementById("grid");
        let newGrid = document.createElement("table");
        let div = document.getElementById("table");

        for(let i = 0; i < xdim; i++){
            let row = newGrid.insertRow(i);
            for(let j = 0; j < ydim; j++){
                let cel = row.insertCell(j);
                spots[(i*ydim)+j] = new Spot(((i*ydim)+j), i, j, 0, false, false);
                if(spots[(i*ydim)+j].val == 0){
                    cel.textContent = " ";
                } else{
                    cel.textContent = spots[(i*ydim)+j].val;
                }
                cel.id = ((i*ydim)+j);
                cel.className = "spot";
                cel.addEventListener("click", function(){
                    if(!gameover){
                        if(!start){
                            start = true;
                            setBoard(i,j);
                            uncover(i,j);
                        } else if (flag){
                            if(spots[(i*ydim)+j].uncovered == false){
                                flagSpot(i,j);
                            }
                        } else if ((spots[(i*ydim)+j].flagged == false) && (spots[(i*ydim)+j].uncovered == false)){
                            uncover(i,j);
                        }
                    }
                });//end event listener 
            }
        }
        if(oldGrid != null){
            oldGrid.remove();
        }
        div.appendChild(newGrid);
        newGrid.id = "grid";
        newGrid.style.width = " "+(ydim*30)+"px"; 
        newGrid.style.height = " "+(xdim*30)+"px"; 
    }


    function uncover(x,y){
        let index = (x*ydim)+y;
        if(spots[index].uncovered == false){
            spots[index].uncovered = true;
            let cell = document.getElementById(index);
            cell.textContent = spots[index].val;
            setCellColor(index);
            if(spots[index].val == "X"){
                gameOver();
            } else {
                if(spots[index].val == 0){
                    cell.textContent = "";
                    for(let i = 0; i < 8; i++){
                        let xspot = x + deltaX[i];
                        let yspot = y + deltaY[i];
                        if((xspot < 0) || (xspot >= xdim) || (yspot < 0) || (yspot >= ydim)){//if spot doesnt exist
                            continue;
                        }
                        uncover(xspot, yspot);
                    }
                }
            }
        }
    }
    

    function setBoard(x,y){
        let minesLeft = mines;
        while(minesLeft > 0){
            let xcoord = Math.floor(Math.random() * xdim);
            let ycoord = Math.floor(Math.random() * ydim);
            if(spots[((xcoord*ydim)+ycoord)].val != "X"){//if spot is not already a mine
                if((xcoord != x) && (ycoord != y)){//if spot is not user selected spot
                    let valid = true;
                    for(let k = 0; k < 8; k++){//check if surrounding spots are not user spot
                        let xspot = xcoord + deltaX[k];
                        let yspot = ycoord + deltaY[k];
                        if((xspot == x) && (yspot== y)){
                            valid = false;
                        }
                    }
                    if(valid){//if spot and surrounding spots are not user spot
                        spots[((xcoord*ydim)+ycoord)].val = "X";
                        minesLeft--;
                        for(let j = 0; j < 8; j++){//check surrounding spots
                            let xcheck = xcoord + deltaX[j];
                            let ycheck = ycoord + deltaY[j];
                            if((xcheck < 0) || (xcheck >= xdim) || (ycheck < 0) || (ycheck >= ydim)){//if spot doesnt exist
                                continue;
                            } else if (spots[((xcheck*ydim)+ycheck)].val == "X"){//if spot is already a mine
                                continue;
                            } else {
                                spots[((xcheck*ydim)+ycheck)].val += 1;
                            }
                        } 
                    }
                    
                }
            }
        
        }
    }


    function setCellColor(id){
        let cell = document.getElementById(id);
        cell.style.backgroundColor = "#b3b3b3";
        if(cell.textContent == "X"){
            cell.style.color = "red";
        } else if (cell.textContent == "8"){
            cell.style.color = "pink";
        } else if (cell.textContent == "7"){
            cell.style.color = "orange";
        } else if (cell.textContent == "6"){
            cell.style.color = "yellow";
        } else if (cell.textContent == "5"){
            cell.style.color = "green";
        } else if (cell.textContent == "4"){
            cell.style.color = "aquamarine";
        } else if (cell.textContent == "3"){
            cell.style.color = "blue";
        } else if (cell.textContent == "2"){
            cell.style.color = "purple";
        } else if (cell.textContent == "1"){
            cell.style.color = "brown";
        } else if (cell.textContent == "▶"){
           cell.style.backgroundColor = "#d9d9d9";
           cell.style.color = "red";
        } 
    }


    function flagSpot(x,y){
        let index = (x*ydim)+y;
        let cell = document.getElementById(index);
        if(spots[index].flagged == true){
            spots[index].flagged = false;
            cell.textContent = " ";
        } else {
            spots[index].flagged = true;
            cell.textContent = "▶";
            setCellColor(index);
        }
    }


    function gameOver(){
        gameover = true;
        alert("Game Over!");
    }

});