import * as yup from "yup"
import { ValidationRules } from "../types"

export const validateRequest = async (
  body: Record<string, unknown>,
  rules: ValidationRules
) => {
  try {
    const schema = yup.object().shape(rules)
    await schema.validate(body, { abortEarly: false })

    return { isValid: true, error: { message: "", status: 200, data: [] } }
  } catch (error) {
    if (error instanceof yup.ValidationError && error?.errors?.length) {
      return {
        isValid: false,
        error: {
          message: error.errors[0],
          status: 400,
          data: error?.errors,
        },
      }
    }

    return {
      isValid: false,
      error: { message: "An unexpected error occurred", status: 500, data: [] },
    }
  }
}
