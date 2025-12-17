import next from "../../../Assets/Images/next.png";
function LeftButton(onClick) {
  return (
    <img
      src={next}
      alt="next-arrow"
      onClick={onClick}
      // onDisable={onDisable}//, onDisable
      width="35px"
      height="35px"
      style={{ float: "left", marginTop: "220px", cursor: "pointer" }}
    />
  );
}

export default LeftButton;
