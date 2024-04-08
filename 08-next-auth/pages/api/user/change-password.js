import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db-util";
import { hashPassword, verifyPassword } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  // Check for the user credentials in the cookies headres
  const session = await getSession({ req: req });

  // Check if the user is authenticated or not
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  // Extracting the data
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  // Connecting to the database
  const client = await connectToDatabase();
  const usersCollection = client
    .db(process.env.mongodb_database)
    .collection("users");

  // Check the user credentials in the database
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }
  // Get the current password of the user from the database
  const currentPassword = user.password;
  // Check if the current password is equal to the old password
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
  if (!passwordsAreEqual) {
    res.status(422).json({ message: "Invalid password!" });
    client.close();
    return;
  }

  // Hash the new password
  const hashedPassword = await hashPassword(newPassword);

  // If the two passwords are equal then do the change password operation
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password updated!" });
}
