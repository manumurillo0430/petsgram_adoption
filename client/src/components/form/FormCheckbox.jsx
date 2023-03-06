import { Checkbox } from "@chakra-ui/react";
import { useFormikContext, Field } from "formik";

export default function FormCheckbox({ fieldName, fieldLabel, isChecked }) {
  const { handleChange } = useFormikContext();

  return (
      <Field
        as={Checkbox}
        name={fieldName}
        mt={2}
        mb={2}
        ml={-5}
        fontWeight="500"
        w="100%"
        flexDirection="row-reverse"
        justifyContent="start"
        gap={8}
        defaultChecked={isChecked}
        onChange={handleChange}
      >
        {fieldLabel}
      </Field>
  )
}