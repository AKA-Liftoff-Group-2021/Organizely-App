export class User {
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    email: string
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
