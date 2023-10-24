import React from "react"

const Tables = ({data, columns}) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>{item[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
} 

export default Tables