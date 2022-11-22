 /*
 minesweeper.js
 Lauren Workosky
 lnw223
 */

 $(() => {
    let xdim = 0;
    let ydim = 0;
    let mines = 0;

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
        alert(""+xdim+"x"+ydim);
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
                spots[(i*xdim)+j] = new Spot(((i*ydim)+j), i, j, 0, false, false);
                let textNode = document.createTextNode(spots[(i*xdim)+j].val);
                cel.appendChild(textNode);
                /*cel.addEventListener("click", function(){
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
                    }//end else 
                });//end event listener */
            }
        }
        if(oldGrid != null){
            oldGrid.remove();
        }
        div.appendChild(newGrid);
        newGrid.id = "grid";
    }
    

});