import PropTypes from 'prop-types'
export default function Card({title, content}){
    return (
        <div className='card'>
            <div className='card-header'>
                {title}
            </div>
            <div className='card-body'>
                {content}
            </div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired
}