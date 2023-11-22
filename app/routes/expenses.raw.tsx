import { type LoaderFunction } from "@remix-run/node";
import { getExpenses } from "~/data/expenses.server";

export const loader: LoaderFunction = () => {
  return getExpenses();
}