class User {
  constructor(login, firstName, lastName, password, email, role) {
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.role = role;
    this.createdAt = new Date();
    this.deletedAt = null;
  }
}

export default User;
