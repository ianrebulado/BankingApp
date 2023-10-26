import '../../../styles/css/styles.css'

function Header({user}) {
    return (
        <div className='page-header'>
            <span>Welcome, {user}</span>
        </div>
    );
}

export default Header;