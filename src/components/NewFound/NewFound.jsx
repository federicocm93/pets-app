import {
  Container,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRef, useState } from "react";
import { addImage, addPet } from "../../api/pets.service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../Shared/TextInput";
import styles from "./NewFound.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { DateTime } from "luxon";
import imagePlaceholder from "../../assets/imagePlaceholder.jpeg";
import "../style.css";

export default function NewFound() {
  const [previewImage, setPreviewImage] = useState();
  const [serverError, setServerError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxDate = DateTime.now();

  const INITIAL_FORM_VALUES = {
    name: "",
    breed: "",
    image: "",
    when: DateTime.now(),
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required("Campo requerido"),
    breed: Yup.string().required("Campo requerido"),
    image: Yup.string().required("Campo requerido"),
    when: Yup.string().required("Campo requerido"),
  });

  const save = (values) => {
    setIsSubmitting(true);
    return addImage(values.image)
      .then((imageUrl) => {
        values.image = imageUrl;
        values.when = values.when.toISODate();
        addPet(values).catch(() => {
          setServerError("Error al guardar datos en el servidor");
        });
      })
      .catch(() => {
        setServerError("Error al cargar imágen");
      })
      .finally(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      });
  };

  const uploadFile = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const inputFile = useRef(null);

  return (
    <Container className={styles.container}>
      <Paper
        elevation={6}
        sx={{
          height: "auto",
          padding: 2,
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <Formik
          initialValues={INITIAL_FORM_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm }) => {
            save(values).then(() => {
              resetForm();
              setPreviewImage(null);
            });
          }}
        >
          {({ values, isValid, dirty, setFieldValue }) => (
            <Form>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} align="center">
                  <Box className={styles.box}>
                    <img
                      alt="img"
                      src={previewImage || imagePlaceholder}
                      className={styles.img}
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
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    label="Fecha de encuentro"
                    value={values.when}
                    maxDate={maxDate}
                    onChange={(newValue) => {
                      setFieldValue("when", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput name="name" label="Nombre de la mascota" />
                </Grid>
                <Grid item xs={12}>
                  {/* TODO: Implement search select */}
                  <TextInput name="breed" label="Raza" />
                </Grid>
                <Grid item xs={12} align="center">
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    disabled={!isValid || !dirty || serverError || isSubmitting}
                    loading={isSubmitting}
                    color="secondary"
                    sx={{ width: "100%" }}
                  >
                    Guardar
                  </LoadingButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Typography
          variant="body2"
          align="left"
          color="textSecondary"
          paddingTop={2}
        >
          Completá toda la información de tu amigo peludo asi estará disponible
          para la comunidad:
        </Typography>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={submitted && serverError}
        autoHideDuration={3000}
        sx={{ borderRadius: 2 }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {serverError}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={submitted && !serverError}
        autoHideDuration={3000}
        onClose={() => setSubmitted(false)}
        sx={{ borderRadius: 2 }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Has agregado una mascota perdida!
        </Alert>
      </Snackbar>
    </Container>
  );
}
