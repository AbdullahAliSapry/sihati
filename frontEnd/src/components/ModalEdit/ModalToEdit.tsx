import { useFormik } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { MdEdit } from "react-icons/md";
function ModalToEdit({
  typeToInput,
  lapel,
  oldValue,
  nameEdit,
}: {
  typeToInput: string;
  lapel: string;
  nameEdit: string;
  oldValue: string;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      name: oldValue,
      email: oldValue,
      phoneNumber: oldValue,
    },
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <MdEdit onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>تعديل اليانات الشخصيه </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{lapel}</Form.Label>
              <Form.Control
                type={typeToInput ? typeToInput : "email"}
                placeholder=""
                autoFocus
                name={nameEdit}
                value={
                  typeToInput == "email"
                    ? formik.values.email
                    : typeToInput == "number"
                    ? formik.values.phoneNumber
                    : typeToInput == "text"
                    ? formik.values.name
                    : ""
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalToEdit;
