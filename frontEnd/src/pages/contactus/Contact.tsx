import Styles from "./Contact.module.css";

const {
  sectionData,
  messageStyle,
  parentSection,
  titleSection,
  ButtonStyle,
  informationContact,
  SeprateStyle,
  PhoneStyle,
} = Styles;
export default function Contact() {
  return (
    <section className={parentSection}>
      <div className={titleSection}>
        <h5>
          اهلا بك في موقعنا عزرا علي امشكه قد واجهتك يرجي ادخال مشكلتك وسيتم
          التواصل معك في اقرب وقت من تفضلك تفحص حسابك من وقت لاخر
        </h5>
        <div className={informationContact}>
          <div>
            <div>
              <i className={`bi bi-telephone ${PhoneStyle}`}></i>
              <span>اتصل بنا</span>
            </div>
            <div>
              <span> يمكنك الاتصال عبر الرقم التالي</span>
              <span>0123456789</span>
            </div>
          </div>
          <hr className={SeprateStyle} />
          <div>
            <div>
              <i className={`bi bi-envelope`}></i>
              <span> اكتب لنا</span>
            </div>
            <div>
              <span>املأ هذا الفورم</span>
              <span>الايميل هو اميلك الذي قمت بتسجيل به علي الموقع</span>
            </div>
          </div>
        </div>
      </div>
      <div className={sectionData}>
        <form>
          <div>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="ادخل اسمك"
              />
            </div>
            <div>
              <input type="email" id="email" placeholder="ادخل ايميلك" />
            </div>
            <div>
              <input type="text" placeholder="ادخل تيلفونك" name="phone" />
            </div>
          </div>
          <div className={messageStyle}>
            <textarea name="message" placeholder="ادخل رسالتك" id=""></textarea>
          </div>
          <button type="submit" className={ButtonStyle}>
            ارسال الرساله
          </button>
        </form>
      </div>
    </section>
  );
}
