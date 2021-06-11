import GamePlay from "./GamePlay";
import GameHost from "./GameHost";
const TheGame = (props) => {
  return (
    <div>
     {props.ishost && <GameHost />}
      <GamePlay />
    </div>
  );
};
export default TheGame;
