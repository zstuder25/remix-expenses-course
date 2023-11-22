import { prisma } from "./database.server";

export const addExpense = async (expenseData, userId) => {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: { connect: { id: userId } },
      },
    });
  } catch (error) {
    throw new Error("Failed to add expense");
  }
};

export const getExpenses = async (userId) => {
  if (!userId) {
    throw new Error("Failed to get all expense");
  }
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return expenses;
  } catch (error) {
    throw new Error("Failed to get all expense");
  }
};

export const getExpense = async (id) => {
  try {
    const expense = await prisma.expense.findFirst({ where: { id } });
    return expense;
  } catch (error) {
    throw new Error("Failed to get expense");
  }
};

export const updateExpense = async (id, expenseData) => {
  try {
    await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    await prisma.expense.delete({ where: { id } });
  } catch (error) {
    throw new Error("Failed to delete expense");
  }
};
