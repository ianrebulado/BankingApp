import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatName } from "../../../lib/utils/formatter";
import { ChevronLeftSquare, ChevronRightSquare } from "lucide-react";

const Table = ({ data, columns, itemsPerPage, rowKey, actions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{formatName(column)}</th>
            ))}
            {actions ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, rowIndex) => (
            <tr key={rowIndex} data-id={item[rowKey]}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{item[column]}</td>
              ))}
              {actions ? <td>{actions}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <ChevronLeftSquare
          onClick={() => handlePageChange(currentPage - 1)}
          className={currentPage === 1 ? "button disabled" : "button"}
        />
        <span>
          {currentPage} of {totalPages}
        </span>
        <ChevronRightSquare
          onClick={() => handlePageChange(currentPage + 1)}
          className={currentPage === totalPages ? "button disabled" : "button"}
        />
      </div>
    </div>
  );
};

export default Table;

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  rowKey: PropTypes.string,
  actions: PropTypes.any,
};
