export type PasswordCreate = {
  name: string;
  username: string;
  password: string;
  email: string;
  /** URL of the website */
  website: string;
  notes: string;
};

export type Password = PasswordCreate & {
  id: string;
};
