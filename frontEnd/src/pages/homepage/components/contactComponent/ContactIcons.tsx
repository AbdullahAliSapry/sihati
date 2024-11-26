import { GrContact } from "react-icons/gr";
import Styles from "./ContactIcons.module.css";
const { iconStyles, parentDiv, navToData, open } = Styles;
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { SiGmail } from "react-icons/si";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function ContactIcons() {
  const openref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    openref.current?.classList.toggle(`${open}`);
  };
  return (
    <div className={parentDiv}>
      <button className={iconStyles} ref={openref} onClick={handleClick}>
        <div>
          <GrContact />
        </div>
        <div className={navToData}>
          <Link to={"https://wa.me/2001092718132?text="} target="_blank">
            <FaWhatsapp style={{ color: "#63E6BE" }} />
          </Link>

          <Link
            to={"https://www.facebook.com/RoboTech552?mibextid=ZbWKwL"}
            target="_blank">
            <CiFacebook style={{ color: "#095cec" }} />
          </Link>

          <Link
            to={
              "https://mail.google.com/mail/u/0/#inbox/FMfcgzQVwwwLvcSHVjGMXsMcTtNhXDGZ"
            }
            target="_blank">
            <SiGmail />
          </Link>
        </div>
      </button>
    </div>
  );
}
