<<<<<<< HEAD
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
=======

function Header({user}) {
    return (
        <div className='page-header'>
            <img className="header-logo" src="/public/combi-dark-logo.png" alt='bankwise-logo' />
            <span>Welcome, {user}</span>
        </div>
    );
>>>>>>> 0c11081735e1b580344c11229650fc9892edf746
}

export default Header;
