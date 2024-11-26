import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styles from "./DoctorProfile.module.css";
import { IDoctor } from "../../../../store/Slices/DoctorSlice";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/Store";
import { UpdateDataDoctor } from "../../../../store/api/DoctorApi";

function EditDoctor({ data }: { data: IDoctor }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch<AppDispatch>();
  const { userConfirmationDoctor } = useSelector(
    (state: RootState) => state.Auth
  );
  const formik = useFormik({
    initialValues: {
      email: userConfirmationDoctor?.data.user.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      location: data.location,
      summary: data.summary ? data.summary : "",
      clinic: data.clinic ? data.clinic : "",
    },
    onSubmit: (values) => {
      console.log(values);

      dispatch(UpdateDataDoctor(values));
      console.log(values);
    },
  });

  return (
    <>
      <button className={styles.EditButton} onClick={handleShow}>
        تعديل البيانات
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>تعديل البيانات الشخصيه </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="email.ControlInput1">
              <Form.Label>ادخل الايميل </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name.ControlInput1">
              <Form.Label>ادخل الاسم </Form.Label>
              <Form.Control
                type="text"
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone.ControlInput1">
              <Form.Label> رقم الهاتف </Form.Label>
              <Form.Control
                type="number"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="location.ControlInput1">
              <Form.Label> المركز</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="location.ControlInput1">
              <Form.Label> مكان العياده تفصيليا</Form.Label>
              <Form.Control
                type="text"
                name="clinic"
                placeholder="مكان العياده"
                value={formik.values.clinic}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="location.ControlInput1">
              <Form.Label> عن الطبيب</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="من افضل الدخل نبذه عنك "
                name="summary"
                value={formik.values.summary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <div>
              <Button variant="secondary" onClick={handleClose}>
                اغلاق
              </Button>
              <Button type="submit" onClick={handleClose}>
                تغير البيانات
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditDoctor;
