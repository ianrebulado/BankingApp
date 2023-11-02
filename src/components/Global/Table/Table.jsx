import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatName } from '../../../lib/utils/formatName';
import '../../../styles/css/styles.css'

const Table = ({data, columns, itemsPerPage, actions}) => {
    const [currentPage, setCurrentPage] =  useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex)

    return (
        <>
            <table className="table-container">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{formatName(column)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, rowIndex) => (
                        <tr key={rowIndex} onClick={()=>{console.log(item)}}>
                            {columns.map((column, colIndex) => (
                            <td key={colIndex}>{item[column]}</td>
                            ))}
                            <td>
                                { actions }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </>
    )
} 

export default Table;

