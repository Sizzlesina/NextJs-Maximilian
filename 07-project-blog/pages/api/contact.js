export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !name ||
      !message ||
      !email.includes("@") ||
      name.trim() === "" ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    // Store it in a database
    const newMessage = {
      email,
      name,
      message,
    };
    console.log(newMessage);

    res
      .status(201)
      .json({ message: "Successfully stored message!", message: newMessage });
  }
}
