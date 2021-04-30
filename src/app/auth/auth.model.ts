export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationIn: Date
  ) {}

  get token(): string | null {
    if (!this._tokenExpirationIn || new Date() > this._tokenExpirationIn) {
      return null;
    }

    return this._token;
  }
}
