import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormikContext, Field } from 'formik'

export default function FormSelectField({
  bbrr,
  btrr,
  br,
  fieldName,
  fieldLabel,
  fieldArray,
  fieldSize,
  mx,
}) {
  const { errors, touched, handleChange } = useFormikContext()

  return (
    <FormControl
      display="flex"
      flexDirection="column"
      alignItems="baseline"
      isInvalid={errors[fieldName] !== undefined && touched[fieldName]}
    >
      <FormLabel mb={2}>{fieldLabel}</FormLabel>
      <Field
        w={fieldSize}
        as={Select}
        name={fieldName}
        onChange={handleChange}
        mx={mx}
        mb={2}
        borderBottomRightRadius={bbrr}
        borderTopRightRadius={btrr}
        borderRadius={br}
      >
        {fieldArray.map((item) => (
          <option key={item} value={`${item}`}>
            {item}
          </option>
        ))}
      </Field>
      <FormErrorMessage>{errors[fieldName]}</FormErrorMessage>
    </FormControl>
  )
}
