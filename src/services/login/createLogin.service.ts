import { TLoginResponse } from "../../interfaces/login.interfaces";
import { TUser } from "../../interfaces/users.interfaces";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async (user: TUser): Promise<TLoginResponse> => {
  const token: string = jwt.sign(
    {
      email: user.email,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "3d",
      subject: user.id.toString(),
    }
  );

  return { token };
};

export { loginService };
