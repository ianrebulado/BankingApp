export default function Card({header, label, value}){
    return (
        <div>
            <span>{header}</span>
            <span>{label}</span>
            <span>{value}</span>
        </div>
    )
}