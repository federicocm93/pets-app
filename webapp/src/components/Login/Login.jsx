import { Container, Grid, Paper, Snackbar, Alert, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../Shared/TextInput";
import logoBlack from "../../assets/logo_black.png";
// import GoogleIcon from "@mui/icons-material/Google";
import styles from "./Login.module.css";
import "../style.css";
import { loginIn /*logInWithGoogle*/ } from "../../api/auth.service";
import { loginUser } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [serverError, setServerError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const processLogin = (name, access_token) => {
    dispatch(loginUser({ name: name }));
    localStorage.setItem("access_token", access_token);
    navigate("/list");
  };

  // const onGoogleLogin = () => {
  //   logInWithGoogle()
  //     .then((response) => {
  //       const { name, access_token } = response.data;
  //       processLogin(name, access_token);
  //     })
  //     .catch((error) => {
  //       setServerError("Error al intentar loguearse");
  //     });
  // };

  const submit = (values) => {
    setIsSubmitting(true);
    return loginIn(values.username, values.password)
      .then((response) => {
        const { name, access_token } = response.data;
        processLogin(name, access_token);
      })
      .catch((error) => {
        setServerError("Error al intentar loguearse");
      })
      .finally(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: "200px",
        minHeight: "60vh",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img alt="icon" src={logoBlack} className={styles.logo_black} />
      </Box>

      <Paper
        sx={{
          flexGrow: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
        }}
      >
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
            <Form style={{ height: "100%", flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Container
                sx={{
                  padding: 4,
                  height: "100%",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextInput name="username" label="Usuario" />
                <TextInput
                  type="password"
                  name="password"
                  label="Contraseña"
                  sx={{ marginTop: 2 }}
                />
                <LoadingButton
                  variant="contained"
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                  loading={isSubmitting}
                  color="secondary"
                  sx={{ width: "100%", marginTop: "auto" }}
                >
                  Acceder
                </LoadingButton>
                {/* <GoogleIcon
                        onClick={onGoogleLogin}
                        sx={{
                          height: "50px",
                          width: "50px",
                        }}
                      >
                        Google
                      </GoogleIcon> */}
              </Container>
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
    </Container>
  );
}
