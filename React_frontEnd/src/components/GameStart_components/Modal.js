const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#a892ee",
  padding: "50px",
  zIndex: 1000,
};
const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, .7)",
  zIndex: 1000,
};
const Modal = ({ open, children, onClose, onWin }) => {
  if (!open) return null;

  return (
    <div>
      <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
          <button className="button" onClick={onClose}>
            Go back
          </button>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
