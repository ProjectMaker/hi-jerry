export class User {
  private _email: string = '';
  private _password: string = '';
  private _origin: string = '';

  public get email() {
    return this._email;
  }

  public set email(email:string) {
    this._email = email;
  }

  public get password() {
    return this._password;
  }

  public set password(password:string) {
    this._password = password;
  }

  public get origin() {
    return this._origin;
  }

  public set origin(origin:string) {
    this._origin = origin;
  }

  public toJSON() {
    return {
      email: this._email,
      password: this._password,
      origin: this._origin
    }
  }
}
