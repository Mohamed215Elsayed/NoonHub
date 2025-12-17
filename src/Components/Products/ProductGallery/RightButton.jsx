import prev from "../../../Assets/Images/prev.png";
function RightButton(onClick) {
  return (
    <img
      src={prev}
      alt="rrow-prev"
      onClick={onClick}
      // onDisable={onDisable}// onDisable
      height="35px"
      width="35px"
      style={{ float: "right", marginTop: "220px", cursor: "pointer" }}
    />
  );
}

export default RightButton;
