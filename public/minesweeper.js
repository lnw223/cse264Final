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
       // alert(""+xdim+"x"+ydim);
        makeGrid();

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
                    if(!start){
                        start = true;
                        setBoard(i,j);
                    } else {
                    }
                    /*if(cel.style.border == "2px solid white"){
                        if(selectedNum < 3){
                            cel.style.border = "2px solid black";
                            for(let k = 0; k < 3; k++){
                                if(selectedImgs[k] == 0){
                                    selectedImgs[k] = cardNums[(3*i)+j];
                                    break;
                                }//end if 
                            }//end for 
                            selectedNum++;
                        }//end if 
                    } else {
                        cel.style.border = "2px solid white";
                        for(let k = 0; k < 3; k++){
                            if(selectedImgs[k] == cardNums[(3*i)+j]){
                                selectedImgs[k] = 0;
                                break;
                            }//end if 
                        }//end for 
                        selectedNum--;
                    }//end else */
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
    
    function setBoard(x,y){
        for(let i = 0; i < mines; i++){
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
                        let cell = document.getElementById((xcoord*ydim)+ycoord);
                        cell.textContent = "X";
                        setCellColor((xcoord*ydim)+ycoord);
                        for(let j = 0; j < 8; j++){//check surrounding spots
                            let xcheck = xcoord + deltaX[j];
                            let ycheck = ycoord + deltaY[j];
                            if((xcheck < 0) || (xcheck >= xdim) || (ycheck < 0) || (ycheck >= ydim)){//if spot doesnt exist
                                continue;
                            } else if (spots[((xcheck*ydim)+ycheck)].val == "X"){//if spot is already a mine
                                continue;
                            } else {
                                let cellChange = document.getElementById((xcheck*ydim)+ycheck);
                                spots[((xcheck*ydim)+ycheck)].val += 1;
                                cellChange.textContent = spots[((xcheck*ydim)+ycheck)].val;
                                setCellColor((xcheck*ydim)+ycheck);
                            }
                        } 
                    }
                    
                }
            }
        }
    }

    function setCellColor(id){
        let cell = document.getElementById(id);
        cell.style.backgroundColor = "lightgrey";
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
        }
    }

});