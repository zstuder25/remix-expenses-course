import { type LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return [{
    id: "1",
    title: "expense",
    amount: 18.99,
    date: new Date().toISOString()
  }]
}