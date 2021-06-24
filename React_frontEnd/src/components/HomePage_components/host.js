const Host = ({ OnHosted }) => {
  return (
    <div className="parts">
      <div>Host a Game</div>
      <button className="button" onClick={OnHosted}>
        Host
      </button>
    </div>
  );
};
export default Host;
