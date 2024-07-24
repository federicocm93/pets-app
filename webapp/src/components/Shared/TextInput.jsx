import { TextField } from "@mui/material";
import React from "react";
import { useField } from "formik";

export default function TextInput({ name, ...props }) {
  const [field, meta] = useField(name);

  const config = {
    ...field,
    ...props,
    fullWidth: true,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return <TextField {...config} />;
}
