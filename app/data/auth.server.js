import { prisma } from "./database.server";
import { hash, compare } from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

export const getUserFromSession = async (request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
};

const createUserSession = async (userId, redirectPath) => {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};

export const destroyUserSession = async (request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    }
  });
};

export const requireUserSession = async (request) => {
  const userId = await getUserFromSession(request);

  if(!userId){
    throw redirect("/auth?mode=login")
  }

  return userId;
}

export const signup = async ({ email, password }) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error("A user already exist with that email");
    error.status = 422;
    throw error;
  }

  const passwordHash = await hash(password, 12);

  const newUser = await prisma.user.create({
    data: { email, password: passwordHash },
  });

  return await createUserSession(newUser.id, "/expenses");
};

export const login = async ({ email, password }) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error = new Error(
      "Could not log you in, please check provided credentials"
    );
    error.status = 401;
    throw error;
  }

  const pwCorrect = await compare(password, existingUser.password);

  if (!pwCorrect) {
    const error = new Error(
      "Could not log you in, please check provided credentials"
    );
    error.status = 401;
    throw error;
  }

  return createUserSession(existingUser.id, "/expenses");
};
