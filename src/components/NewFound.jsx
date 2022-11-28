import { Container, Grid, Paper, Typography } from "@mui/material";
import { addPet } from "../api/pets.service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./shared/TextInput";

export default function NewFound() {
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

  const save = () => {
    addPet();
  };

  return (
    <Container style={{ paddingTop: 100 }}>
      <Typography variant="h3" component="div" align="center">
        Ingresa los datos de la mascota que encontraste!
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Formik
          initialValues={INITIAL_FORM_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={save}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} align="center">
                {/* TODO: Implement image selector */}
                <img
                  alt="img"
                  src="https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg"
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
            </Grid>
          </Form>
        </Formik>
      </Paper>
    </Container>
  );
}
