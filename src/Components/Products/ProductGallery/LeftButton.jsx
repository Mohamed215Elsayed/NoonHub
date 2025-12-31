// import next from "../../../Assets/Images/next.png";
// function LeftButton(onClick,onDisable) {
//   return (
//     <img
//       src={next}
//       alt="next-arrow"
//       onClick={onClick}
//       onDisable={onDisable}
//       width="35px"
//       height="35px"
//       style={{ float: "left", marginTop: "220px", cursor: "pointer" }}
//     />
//   );
// }

// export default LeftButton;

import next from "../../../Assets/Images/next.png";

function LeftButton({ onClick, disabled }) {
  return (
    <img
      src={next}
      alt="next"
      onClick={onClick}
      className="image-gallery-left-nav" 
      style={{ 
        position: "absolute", 
        left: "15px", 
        zIndex: "4", 
        cursor: "pointer",
        opacity: disabled ? "0.3" : "1",
        width: "35px"
      }}
    />
  );
}
export default LeftButton;
