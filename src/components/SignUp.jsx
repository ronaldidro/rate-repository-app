import { StyleSheet, View } from "react-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import Button from "./Button";
import { CREATE_USER } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const initialValues = { username: "", password: "", passwordConfirmation: "" };

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username should be at least ${min} characters")
    .max(30, "Username should be at max ${max} characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password should be at least ${min} characters")
    .max(50, "Password should be at max ${max} characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="passwordConfirmation"
          placeholder="Password confirmation"
          secureTextEntry
        />
      </View>
      <Button handlePress={onSubmit}>Sign up</Button>
    </View>
  );
};

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    const response = await mutate({
      variables: { user: { username, password } },
    });

    if (response.data) {
      await signIn({ username: response.data.createUser.username, password });
      navigate("/", { replace: true });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
