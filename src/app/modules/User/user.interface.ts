export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: number;
  role: "admin" | "user";
  address: string;
};
