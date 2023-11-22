import { redirect, type ActionFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server"
import { validateExpenseInput } from "~/data/validation.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }
  
  await addExpense(expenseData);

  return redirect("/expenses");
};

export default function ExpensesAddPage() {
  const navigate = useNavigate();
  const closeHandler = () => {
    navigate("..")
  }
    return (
      <Modal onClose={closeHandler}>
        <ExpenseForm />
      </Modal>
    );
  }
  