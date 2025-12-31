import "./PotSpinner.css";

const PotSpinner = ({ size = 60, text }) => {
  return (
    <div className="pot-spinner-wrapper">
      <div className="pot-spinner" style={{ width: size, height: size }}>
        <span className="pot-lid"></span>
        <span className="pot-body"></span>
      </div>

      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
  );
};

export default PotSpinner;
