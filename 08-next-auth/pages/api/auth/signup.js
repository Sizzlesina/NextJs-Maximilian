import { hashPassword } from "../../../lib/auth";
import { connectDatabase, insertDocument } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !password ||
    !email.includes("@") ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid input!" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const client = await connectDatabase();
  const result = await insertDocument(client, "users", {
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ messag: "Created user!" });
}