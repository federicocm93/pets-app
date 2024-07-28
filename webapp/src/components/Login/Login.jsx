import { Container, Grid, Paper, Snackbar, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../Shared/TextInput";
import logoBlack from "../../assets/logo_black.png";
import GoogleIcon from "@mui/icons-material/Google";
import styles from "./Login.module.css";
import "../style.css";
import { useEffect } from "react";
import { loginIn, logInWithGoogle } from "../../api/auth.service";
import { loginUser } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [serverError, setServerError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const INITIAL_FORM_VALUES = {
    username: "",
    password: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    username: Yup.string().required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onGoogleLogin = () => {
    logInWithGoogle().then((data) => setUser(data));
  };

  const submit = (values) => {
    console.log(values);
    setIsSubmitting(true);
    return loginIn(values.username, values.password)
      .then((response) => {
        const { name, access_token } = response.data;
        dispatch(loginUser({ name: name }));
        localStorage.setItem("access_token", access_token);
        navigate("/list");
      })
      .catch((error) => {
        console.log(error);
        setServerError("Error al intentar loguearse");
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
                      <TextInput name="username" label="Usuario" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextInput type="password" name="password" label="Contraseña" />
                    </Grid>
                    <Grid item xs={12} align="center">
                      <LoadingButton
                        variant="contained"
                        type="submit"
                        disabled={!isValid || !dirty || isSubmitting}
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
            open={submitted && !!serverError}
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
              Bienvenido!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Container>
  );
}
