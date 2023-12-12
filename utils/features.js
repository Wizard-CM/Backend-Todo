import jwt from "jsonwebtoken";

export const cookieAdd = (dbUser,statusCode = 200,message,res) => {
  // Creating a jwt token , token consists of the database-id of the user
  const token = jwt.sign({ id: dbUser._id }, process.env.JWT_SECRET);

  // Sending a respponse
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure:process.env.NODE_ENV === "Development" ? false : true
    })
    .json({
      success: true,
      message: message,
    });
};
