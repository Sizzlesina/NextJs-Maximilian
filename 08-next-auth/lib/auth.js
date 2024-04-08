import { hash, compare } from "bcryptjs";
// Hash the password
export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}

// Compare the hashed password with another password that we give to the function
export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
