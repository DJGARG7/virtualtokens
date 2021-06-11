const TheGame = ()=>{
    const tableBal=500;
    const myBal=300;
    return (
        <div className="parts">
            <div>Table Balance</div>
            <div>{tableBal}</div>
            <div>My Balance</div>
            <div>{myBal}</div>
            <form>
                <input type="number" /> 
            </form>
            <button>Add to table</button>
        </div>
    );
}
export default TheGame;