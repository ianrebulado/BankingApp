import '../../../styles/css/styles.css'

export default function Card({label, value}){
    return (
        <div className='card'>
            <span className='card-header'>{label}</span>
            <span className='card-body'>{value}</span>
        </div>
    )
}