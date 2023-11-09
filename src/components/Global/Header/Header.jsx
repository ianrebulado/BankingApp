function Header({ user }) {
  return (
    <div className="page-header">
      <img
        className="header-logo"
        src="/public/combi-dark-logo.png"
        alt="bankwise-logo"
      />
      <span>Welcome, {user}</span>
    </div>
  );
}

export default Header;
