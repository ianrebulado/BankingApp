import logo from "../../../../public/combi-dark-logo.png";

function Header({ user }) {
  return (
    <div className="page-header">
      <img
        className="header-logo"
        src={logo}
        alt="bankwise-logo"
      />
      <span>Welcome, {user}</span>
    </div>
  );
}

export default Header;
