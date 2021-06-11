import "./style.css";
const Host = (props) => {
  const hostingClickHandler = () => {
    props.Hosted();
  };
  return (
    <div className="parts">
      <div>Host a Game</div>
      <button onClick={hostingClickHandler}>Host</button>
    </div>
  );
};

export default Host;
