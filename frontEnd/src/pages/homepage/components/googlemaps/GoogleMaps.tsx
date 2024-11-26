export default function GoogleMaps() {
  return (
    <div className="parentmapping">
      <h2>اكتشف موقعنا</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d54996.593349803225!2d30.93024905!3d30.512920299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1717173747853!5m2!1sen!2seg"
        width="900"
        height="500"
        className="mapping"
        style={{ border: "0" }}
        loading="lazy"></iframe>
    </div>
  );
}
