import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { json, type LoaderFunction } from "@remix-run/node";
import { type CatchBoundaryComponent, useCatch, useLoaderData, Link } from "@remix-run/react";
import { getExpenses } from "~/data/expenses.server";
import Error from "~/components/util/Error";

export const loader: LoaderFunction = async () => {
  const expenses =  await getExpenses();

  if(!expenses || expenses.length < 1){
      throw json({ message: "Could not find any expenses."}, {status: 404, statusText: "No expenses yet!"});
  }

  return expenses;
}

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caughtResponse = useCatch();
  return <main>
    <Error title={caughtResponse.statusText}>
      <p><Link to="/expenses/add">Get Started!</Link></p>
      <Chart expenses={[]} />
    </Error>
  </main>
}

export default function ExpenseAnalysisPage() {
  const expenseData = useLoaderData();
    return (
      <main>
        <Chart expenses={expenseData}/>
        <ExpenseStatistics expenses={expenseData}/>
      </main>
    );
  }
  