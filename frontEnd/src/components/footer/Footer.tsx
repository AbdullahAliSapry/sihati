import styles from "./Footer.module.css"

const { styleFooter } = styles;
export default function Footer() {
  return (
    <div className={styleFooter}>
      <div>
        حقوق النشر محفوظه <span>sihati.com</span> &copy;لسنة:
        {new Date().getFullYear().toString()}
      </div>
    </div>
  );
}
