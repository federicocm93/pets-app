import { Container, Grid, Paper, Snackbar, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { addImage, addPet } from "../../api/pets.service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../Shared/TextInput";
import logoBlack from "../../assets/logo_black.png";
import GoogleIcon from "@mui/icons-material/Google";
import styles from "./Login.module.css";
import "../style.css";
import { useEffect } from "react";
import { signInWithGoogle } from "../../api/auth.service";

export default function Login() {
  const [serverError, setServerError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState();

  const INITIAL_FORM_VALUES = {
    user: "",
    password: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    user: Yup.string().required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onGoogleLogin = () => {
    signInWithGoogle().then((data) => setUser(data));
  };

  const submit = (values) => {
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

  return (
    <Container className={styles.container}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} align="center">
          <img alt="icon" src={logoBlack} className={styles.logo_black} />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2, overflow: "hidden", borderRadius: 2 }}>
            <Formik
              initialValues={INITIAL_FORM_VALUES}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, { resetForm }) => {
                submit(values).then(() => {
                  resetForm();
                });
              }}
            >
              {({ isValid, dirty }) => (
                <Form>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <TextInput name="user" label="Usuario" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextInput name="password" label="Contraseña" />
                    </Grid>
                    <Grid item xs={12} align="center">
                      <LoadingButton
                        variant="contained"
                        type="submit"
                        disabled={
                          !isValid || !dirty || serverError || isSubmitting
                        }
                        loading={isSubmitting}
                        color="secondary"
                        sx={{ width: "100%" }}
                      >
                        Acceder
                      </LoadingButton>
                    </Grid>
                    <Grid item xs={12} align="center">
                      <GoogleIcon
                        onClick={onGoogleLogin}
                        sx={{
                          height: "50px",
                          width: "50px",
                        }}
                      >
                        Google
                      </GoogleIcon>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
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
        </Grid>
      </Grid>
    </Container>
  );
}
