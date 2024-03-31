import { StyleSheet, View } from "react-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as yup from "yup";

import { CREATE_REVIEW } from "../graphql/mutations";
import FormikTextInput from "./FormikTextInput";
import Button from "./Button";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be greater or equal to ${min}")
    .max(100, "Rating must be less or equal to ${max}")
    .required("Rating is required"),
  text: yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="rating"
          placeholder="Rating between 0 and 100"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="text" placeholder="Review" multiline />
      </View>
      <Button handlePress={onSubmit}>Create a review</Button>
    </View>
  );
};

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const response = await mutate({
      variables: { review: { ...values, rating: parseInt(values.rating) } },
    });

    if (response.data) {
      const repositoryId = response.data.createReview.repositoryId;
      navigate(`/${repositoryId}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
