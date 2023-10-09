import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenarator from "otp-generator";

/**POST: http://localhost:8080/api/register
 * @param:{
 * "username": "example123",
 * "password" : "admin123",
 * "email" : "example@gmail.com"
 * "firstname": "bill",
 * "lastname" : "william",
 * "mobile" : 8009860560,
 * "address" : "Apt. 556, Kulas Light, Gwenborough"
 * "profile" : ""
 * }
 */

/**Middleware for verify user */
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    //check the user existance

    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

export async function register(req, res) {
  try {
    const { username, password, profile, email, institute } = req.body;

    // check the existing user
    const existUsername = UserModel.findOne({ username });
    //check for existing email
    const existEmail = UserModel.findOne({ email });
    const [usernameDoc, emailDoc] = await Promise.all([
      existUsername.exec(),
      existEmail.exec(),
    ]);

    if (usernameDoc) {
      return res.status(400).send({ error: "Please use unique username" });
    }

    if (emailDoc) {
      return res.status(400).send({ error: "Please use unique email" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        username,
        password: hashedPassword,
        profile: profile || "",
        email,
        institute,
      });

      // return save result as a response
      await user.save();
      return res.status(201).send({ msg: "User Register Successfully" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

/** POST: https://localhost:8000/api/login
 * @param:{
 * "username": "examples123",
 * "password" : "admin123"
 * }
 */
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "Username not Found" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).send({ error: "Password does not Match" });
    }

    //create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      ENV.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      msg: "Login Successful ... !",
      username: user.username,
      token,
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
}
/** GET: http://localhost8000/api/user/example123  */

export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: "Invalid Username" });

    const user = await UserModel.findOne({ username }).exec();
    if (!user) {
      return res.status(501).send({ error: "Couldn't Find the User" });
    }

    /** REMOVE PASSWORD FROM USER */
    const { password, ...rest } = Object.assign({}, user.toJSON());
    const userWithoutPassword = rest;

    return res.status(201).send(userWithoutPassword);
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
}
/** PUT : htttp://localhost:8000/api/updateUser
 *  @param :{
 * "id" : "<userid>"
 *
 * }
 * body:{
 * firstname:'',
 * address:'',
 * profile:''
 * }
 */

export async function updateUser(req, res) {
  try {
    //const id = req.query.id
    const { userId } = req.user;

    const id = req.query.id;
    if (!userId) return res.status(401).send({ error: "User Not Found...!" });

    const body = req.body;
    await UserModel.updateOne({ _id: userId }, body);
    return res.status(201).send({ msg: "Record Updated...!" });
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/* GET: http://localhost:8000/api/generateOTP */
export async function generateOTP(req, res) {
  // res.json("generateOTP route");
  req.app.locals.resetSession = true; // Start the reset session
  req.app.locals.OTP = await otpGenarator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

/* GET: http://localhost:8000/api/verifyOTP */
export async function verifyOTP(req, res) {
  // res.json("verifyOTP route");
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; //reset the OTP value
    req.app.locals.resetSession = true; //start session for reset password
    return res.status(201).send({ msg: "Verify Successfully!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

// successfully redirect user when OTP is valid
/* GET: http://localhost:8000/api/createResetSession */
export async function createResetSession(req, res) {
  // res.json("createResetSession route");
  if (req.app.locals.resetSession) {
    // req.app.locals.resetSession = false; // allow access to this route only once
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
}

// update the password when we have a valid reason
/**PUT : https://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "Username not Found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.updateOne(
      { username: user.username },
      { password: hashedPassword }
    );

    req.app.locals.resetSession = false;
    return res.status(201).send({ msg: "Record Updated...!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
