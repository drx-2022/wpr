import Square from './Square';

export default function Board({squares,clk}){

    return (
        <div className="board">
      {squares.map((s,i)=> <Square key={i} index = {i} value = {s}  onSquareClick = {clk}/>)}
    </div>
    )
}