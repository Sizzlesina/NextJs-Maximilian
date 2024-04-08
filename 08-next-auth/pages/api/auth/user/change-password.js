import { getSession } from "next-auth/client";

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
}
