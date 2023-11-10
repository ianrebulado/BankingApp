import { Button } from '../../../components';
import { formatDate, formatAmount } from '../../../lib/utils/formatter';
import { deleteExpense, getUserExpenses } from '../../../lib/utils/expenses';

function ConfirmExpenseDelete({ expense, setShowDeleteConfirm, updateExpenses, setShowModal, setShowToast }) {

    const handleConfirmDelete = () => {
        deleteExpense(expense.expense_id)

        const expenses = getUserExpenses(expense.user_id);
        updateExpenses(expenses);

        setShowDeleteConfirm(false);
        setShowToast(true);
        setShowModal(false);
    }
  
    const handleCancel = () => {
      setShowDeleteConfirm(false);
      setShowModal(false);
    }

    return (
        <div className="confirm-delete-container">
          <div className="confirm-delete-title">You are about to delete this expense:</div>
          <div className="confirm-delete-item">
            <div className="item-container">
              <div className="item-title">ID:</div>
              <div>{expense.expense_id}</div>
            </div>
            <div className="item-container">
              <div className="item-title">Created On:</div> 
              <div className="item-desc">{formatDate(expense.created_on)}</div>
            </div>
            <div className="item-container">
              <div className="item-title">Description:</div> 
              <div className="item-desc">{expense.description}</div>
            </div>
            <div className="item-container">
              <div className="item-title">Amount:</div> 
              <div className="item-desc">{formatAmount(expense.amount)}</div>
            </div>
          </div>
          <div className="buttons-container">
            <Button type={'button'} text={'Confirm'} handleClick={handleConfirmDelete} />
            <Button type={'button'} text={'Cancel'} handleClick={handleCancel} secondary />
          </div>
        </div>
    );
}

export default ConfirmExpenseDelete;