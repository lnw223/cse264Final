 /*
 minesweeper.js
 Lauren Workosky
 lnw223
 */

 $(() => {
    let xdim = 0;
    let ydim = 0;
    let mines = 0;

    $("#reset").on("click", function(){
        if($('#difficulty').val() == "easy"){
            xdim = 9;
            ydim = 9;
            mines = 10;
        } else if ($('#difficulty').val() == ""){
            xdim = 16;
            ydim = 16;
            mines = 40;
        } else {
            xdim = 16;
            ydim = 30;
            mines = 99;
        }
    });
    

});