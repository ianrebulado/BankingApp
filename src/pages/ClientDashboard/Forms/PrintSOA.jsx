import React from 'react';
import ReactDOMServer from 'react-dom/server';

function PrintSOA({userTransactions}) {
    
if(userTransactions){
    const printContent = userTransactions.map((transaction) => (
        <tr key={transaction.transaction_id}>
            <td>{transaction.transaction_id}</td>
            <td>{transaction.type}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.created_on}</td>
        </tr>
    ));

    return (
        <html>
            <head>
                <title>Statement of Account</title>
            </head>
            <body>
                <table>
                    <th>
                        <td>Transaction ID</td>
                        <td>Type</td>
                        <td>Amount</td>
                        <td>Date</td>
                    </th>
                    <tbody>
                        {printContent}
                    </tbody>
                </table>
            </body>
        </html>
    )
}    

return null;
        
}

export default PrintSOA;