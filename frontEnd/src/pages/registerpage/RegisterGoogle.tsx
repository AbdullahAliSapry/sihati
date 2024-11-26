import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import styles from "./RegisterPage.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
const { iconsStyle } = styles;
export default function RegisterGoogle() {
  const RegisterHandler = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${credentialResponse.access_token}`,
            },
          }
        );
        console.log(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });




  
  return (
    <div>
      <div className={iconsStyle}>
        <div>
          <FcGoogle onClick={() => RegisterHandler()} />
        </div>
        <div>
          <FaFacebookSquare />
        </div>

        <div>
          <RiTwitterXFill />
        </div>
      </div>
    </div>
  );
}
