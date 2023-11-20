import { Outlet, Link } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";

const DUMMY = [{
    id: "1",
    title: "expense",
    amount: 18.99,
    date: new Date().toISOString()
  }]
  

export default function ExpensesLayout() {
    return (
        <>
            <Outlet />
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus />
                        <span>Add Expense</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload />
                        <span>Load Raw Data</span>
                    </a>
                </section>
                <ExpensesList expenses={DUMMY} />
            </main>
        </>
    )
}