import axios from "axios";
import qs from "qs";

export default function AuthToken(d) {
  let data = {};
  data["username"] = d.username;
  data["password"] = d.password;
  console.log(data);
  const options = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  };
  axios
    .post(
      "https://bug-tracker01.herokuapp.com/api/auth",
      qs.stringify(data),
      options
    )
    .then(
      (response) => {
        console.log(`token: ${response.data.token}`);
        console.log("logged in");
        document.cookie = `Token=${response.data.token}`;
        localStorage.setItem("token", response.data.token);
      },
      (error) => {
        console.log(error);
      }
    );
}
