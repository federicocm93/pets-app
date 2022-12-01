import { Container, Grid, Paper, Typography } from "@mui/material";
import { useRef } from "react";
import { addPet } from "../api/pets.service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./shared/TextInput";
import Button from "@mui/material/Button";
import "./style.css";
import { useState } from "react";

export default function NewFound() {
  const [previewImage, setPreviewImage] = useState();

  const INITIAL_FORM_VALUES = {
    name: "",
    breed: "",
    image: "",
    when: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required("Campo requerido"),
    breed: Yup.string().required("Campo requerido"),
    image: Yup.string().required("Campo requerido"),
    when: Yup.string().required("Campo requerido"), // TODO: Validate correctly
  });

  const save = (values) => {
    console.log(values);
    // addPet();
  };

  const uploadFile = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const inputFile = useRef(null);

  return (
    <Container style={{ paddingTop: 100 }}>
      <Typography variant="h3" component="div" align="center">
        Ingresá los datos de la mascota que encontraste
      </Typography>
      <Paper sx={{ padding: 2, overflow: "hidden" }}>
        <Formik
          initialValues={INITIAL_FORM_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={save}
        >
          {({ values, handleChange, isValid, dirty, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                  {/* TODO: Implement image selector */}
                  <img
                    alt="img"
                    src={
                      previewImage ||
                      "https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg"
                    }
                    className="centered-img"
                    onClick={uploadFile}
                  />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    ref={inputFile}
                    style={{ display: "none" }}
                    onChange={(event) => {
                      setFieldValue("image", event.target.files[0]);
                      setPreviewImage(
                        URL.createObjectURL(event.target.files[0])
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput name="name" label="Nombre de la mascota" />
                </Grid>
                <Grid item xs={6}>
                  {/* TODO: Implement search select */}
                  <TextInput name="breed" label="Raza" />
                </Grid>
                <Grid item xs={12}>
                  {/* TODO: Implement date selector */}
                  <TextInput name="when" label="Fecha de encuentro" />
                </Grid>
                <Grid item xs={12} align="center">
                  {/* TODO: Implement date selector */}
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!isValid || !dirty}
                  >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}
