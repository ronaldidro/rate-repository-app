import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";

import useSignIn from "../hooks/useSignIn";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  inputContainter: {
    marginBottom: 15,
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "gray",
  },
  errorInput: {
    borderColor: "#d73a4a",
  },
  errorText: {
    color: "#d73a4a",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = { username: "", password: "" };

const SingInForm = ({ onSubmit }) => {
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const isUsernameError = formik.touched.username && formik.errors.username;
  const isPasswordError = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainter}>
        <TextInput
          style={[styles.input, isUsernameError && styles.errorInput]}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
        {isUsernameError && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}
      </View>
      <View style={styles.inputContainter}>
        <TextInput
          secureTextEntry
          style={[styles.input, isPasswordError && styles.errorInput]}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        {isPasswordError && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}
      </View>
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={{ color: "white", fontSize: 18 }}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    await signIn({ username, password });
    navigate("/repositories");
  };

  return <SingInForm onSubmit={handleSubmit} />;
};

export default SignIn;
