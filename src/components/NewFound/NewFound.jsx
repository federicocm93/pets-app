import { Container, Grid, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { addImage, addPet } from "../../api/pets.service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../Shared/TextInput";
import Button from "@mui/material/Button";
import styles from "./NewFound.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { DateTime } from "luxon";
import "../style.css";

export default function NewFound() {
  const [previewImage, setPreviewImage] = useState();
  const [serverError, setServerError] = useState(null);

  const INITIAL_FORM_VALUES = {
    name: "",
    breed: "",
    image: "",
    when: DateTime.now().toISODate(),
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required("Campo requerido"),
    breed: Yup.string().required("Campo requerido"),
    image: Yup.string().required("Campo requerido"),
    when: Yup.string().required("Campo requerido"), // TODO: Validate correctly
  });

  const save = (values) => {
    console.log(values);
    addImage(values.image)
      .then((imageUrl) => {
        values.image = imageUrl;
        values.when = values.when.toISODate();
        addPet(values).catch(() => {
          setServerError("Error al guardar datos en el servidor");
        });
      })
      .catch(() => {
        setServerError("Error al cargar imágen");
      });
  };

  const uploadFile = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const inputFile = useRef(null);

  return (
    <Container className={styles.container}>
      <Typography
        align="center"
        color="textPrimary"
        paddingBottom={2}
        sx={{ typography: { sm: "h4", xs: "h5" } }}
      >
        Ingresá los datos de la mascota
      </Typography>
      <Paper sx={{ padding: 2, overflow: "hidden", borderRadius: 2 }}>
        <Formik
          initialValues={INITIAL_FORM_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm }) => {
            save(values);
            resetForm();
          }}
        >
          {({ values, handleChange, isValid, dirty, setFieldValue }) => (
            <Form>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} align="center">
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
                    className={styles.input}
                    onChange={(event) => {
                      setFieldValue("image", event.target.files[0]);
                      setPreviewImage(
                        URL.createObjectURL(event.target.files[0])
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    label="Fecha de encuentro"
                    value={values.when}
                    onChange={(newValue) => {
                      setFieldValue("when", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput name="name" label="Nombre de la mascota" />
                </Grid>
                <Grid item xs={6}>
                  {/* TODO: Implement search select */}
                  <TextInput name="breed" label="Raza" />
                </Grid>
                <Grid item xs={12} align="center">
                  {serverError && <Alert severity="error">{serverError}</Alert>}
                </Grid>
                <Grid item xs={12} align="center">
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!isValid || !dirty || serverError}
                    color="secondary"
                    sx={{ width: "100%" }}
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
