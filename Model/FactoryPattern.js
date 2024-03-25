import pg from "pg";

const config = {
  
};


class UserProfile {
  constructor() {
    this.email;
    this.password;
    this.firstName;
    this.lastName;
    this.isVerify = false;
  }
}

// abstract Class
class DataEntry {
  create() {}
}


export default class UserFactory extends DataEntry {
  constructor() {
    super();
    this.userProfile = new UserProfile();
  }

  Create(email, password, fName, lName) {
    this.userProfile.email = email.toLowerCase().trim();
    this.userProfile.password = password;
    this.userProfile.firstName = fName.toLowerCase().trim();
    this.userProfile.lastName = lName.toLowerCase().trim();
  }

  Save() {
    const query =
      "INSERT INTO user_profile (email, password, first_name, last_name) VALUES($1, $2, $3, $4)";
    const values = [this.userProfile.email, this.userProfile.password, this.userProfile.firstName, this.userProfile.lastName];
    const client = new pg.Client(config);

    console.log(values)
    new Promise((resolve, reject) => {
      client.connect();

      client
        .query(query, values)
        .then((result) => {
          if (result.rowCount > 0) {
            console.log(
              "Successfull: User input was inserted into the database"
            );
          } else console.log("ERROR: No row was effected");
        })
        .catch((error) => {
          console.error("ERROR: " + error.message);
        })
        .finally(() => client.end());
    });
  }

  /**
   * This function utilizes the email to locate the user's account within a database, enabling it to execute a query and set 'is_verify' to true.
   * @param {String} email - The user's email
   */
  ValidateEmail() {
    //Done 3/22/24
    const query = "UPDATE user_profile SET is_verify = $1 WHERE email = $2";
    const values = [true, this.userProfile.email];

    const client = new pg.Client(config); //**** Decouple - look on log from more info. */

    new Promise((resolve, reason) => {
      client.connect();
      client
        .query(query, values)
        .then((result) => {
          if (result.rowCount > 0) {
            console.log("Account Update: is_verify = true;");
          } else {
            console.log("Error: Did not find an Account");
          }
        })
        .catch((error) => {
          console.error("ERROR: " + error.message);
        })
        .finally(() => client.end());
    });
  }

  /**
   * Checks database field for boolean value.
   * @param {String} email - User's email
   * @todo: NEEDS AWAIT FOR RESULT
   */

  CheckVerify() {
    //Done 3/21/24
    const query = "SELECT is_verify FROM user_profile WHERE email = $1;";
    const values = [this.userProfile.email];

    const client = new pg.Client(config);

    return new Promise((resolve, reject) => {
      client.connect();

      client
        .query(query, values)
        .then((result) => {
          const queryResult = result.rows[0].is_verify;
          resolve(queryResult);
        })
        .catch((error) => {
          console.error("Error with CheckVerify() - Query : " + error.message);
          resolve(false);
        })
        .finally(() => client.end());
    });
  }

  /**
   * This method returns a boolean value depending on whether the email and password match an entry from the database.
   * @param {String} email - The email of the user.
   * @param {String} password - The password of the user.
   * @returns {boolean} If email and password match an entry then true else false.
   * @todo: NEEDS AWAIT FOR RESULT
   */
  ValidateAccount() {
    //Done_ 3/21/24
    const query = `SELECT CASE WHEN EXISTS (SELECT 2 FROM user_profile WHERE email = $1 AND password = $2) THEN TRUE ELSE FALSE END AS is_valid`;
    const values = [this.userProfile.email, this.userProfile.password];

    const client = new pg.Client(config);

    return new Promise((resolve, reject) => {
      client.connect();

      client
        .query(query, values)
        .then((result) => {
          const queryResult = result.rows[0].is_valid;
          resolve(queryResult);
        })
        .catch((error) => {
          console.error(
            "Error with ValidateAccount() - Query : " + error.message
          );
          resolve(false);
        })
        .finally(() => client.end());
    });
  }
}



