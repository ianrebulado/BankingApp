import PropTypes from "prop-types";
export default function Card({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
};
