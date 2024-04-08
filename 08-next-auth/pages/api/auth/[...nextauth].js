import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db-util";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client
          .db(process.env.mongodb_database)
          .collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        // Check in the database if the user email is exist or not
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        // Check if the input password is as same as the password in the database or not
        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        // If the user credentials were correct
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
