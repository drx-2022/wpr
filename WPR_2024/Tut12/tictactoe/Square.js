export default function Square({index, value,onSquareClick}){
    return(
        <div className="square" onClick={()=> onSquareClick(index)}>{value}</div>
    )
}