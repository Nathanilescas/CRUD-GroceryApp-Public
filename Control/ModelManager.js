import UserFactory from "../Model/FactoryPattern.js";



class ICommand {
  Execute() {}
} 

export class SignUp extends ICommand {
  constructor(account) {
    super();
    this.account = account
  }

  Execute() {
    this.account.Save();
  }
}

export class VerifyEmail extends ICommand {
  constructor(account) {
    super();
    this.account = account
  }
  Execute() {
    this.account.ValidateEmail();
  }
}

/**
 *
 * @param: email - account user's email
 * @param: password - account user's password
 */
export class Login extends ICommand { 
  constructor(account) {
    super();
    this.account = account;
  }

  Execute() {
    return new Promise( (resolve, reject) => {
      this.account.CheckVerify()
      .then( (result) => {
        if (result) {
          this.account.ValidateAccount()
          .then( (result) => {
            resolve(result);
          })
        }
        else resolve(false)
      })
    })
  }
}