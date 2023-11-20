import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";

const DUMMY = [{
  id: "1",
  title: "expense",
  amount: 18.99,
  date: new Date().toISOString()
}]

export default function ExpenseAnalysisPage() {
    return (
      <main>
        <Chart expenses={DUMMY}/>
        <ExpenseStatistics expenses={DUMMY}/>
      </main>
    );
  }
  