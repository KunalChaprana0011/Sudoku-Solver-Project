var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetSudoku')
let SolvePuzzle = document.getElementById('SolveSudoku')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolve(board, 0, 0, 9);
};

function isValid(board ,  i , j , num , n)
{
    // Row Check

    for(let col =0 ; col < n ;col++)
    {
        if(board[i][col] == num)
        {
            return false;
        }
    }


    // Column check

    for(let row =0 ; row < n ;row++)
    {
        if(board[row][j] == num)
        {
            return false;
        }
    }


    //grid Check

    let rootN = Math.sqrt(n);
    let StartRow = i - i%rootN;
    let StartCol=  j - j%rootN;

    for(let row = StartRow ; row < StartRow + rootN ; row++ )
    {
        for(let col = StartCol; col < StartCol + rootN ; col++ )
        {
            if(board[row][col] == num)
            {
                return false;
            }
        }
    }

    return true;

}
function SudokuSolve( board ,  i , j,n )
{

    //Base Case

    if( i == n)
    {
        // printBoard(board,n);
		FillBoard(board) 

        return true;
    }


    //// if we went outside the board 

    if( j == n)
    {
        return SudokuSolve(board,i+1,0,n);
    }

    // if cell is already filled
    if(board[i][j] != 0)
    {
        return SudokuSolve(board,i,j+1,n);
    }


    // try to fill cell with appropriate number

    for(let num = 1 ;num <= 9 ; num++)
    {
        //Check if we can place that number

        if(isValid(board,i,j,num,n))
        {
            board[i][j] = num;
            let subAns = SudokuSolve(board,i,j+1,n);
            // further board solve 
            if(subAns)
            {
                return true;
            }


            // backtracking undo changes
            board[i][j] = 0;
        }
    }
    //not possible to find aNY VALID NUM
    return false;
}