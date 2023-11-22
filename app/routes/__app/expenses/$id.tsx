// import { type LoaderFunction } from "@remix-run/node";
import { redirect, type ActionFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
// import { getExpense } from "~/data/expenses.server";

// export const loader: LoaderFunction = async ({params}) => {
//   const expenseId = params.id;
//   return await getExpense(expenseId);
// }

export const action: ActionFunction = async ({ params, request }) => {
  const expenseId = params.id;
  if(request.method === "PATCH"){
    const formData = await request.formData()
    const expenseData = Object.fromEntries(formData);
  
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }
  
    updateExpense(expenseId, expenseData);
    return redirect("/expenses");
  } else if(request.method === "DELETE") {
    await deleteExpense(expenseId);
    return redirect("/expenses");
  }
}

export default function UpdateExpensesPage() {
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
  