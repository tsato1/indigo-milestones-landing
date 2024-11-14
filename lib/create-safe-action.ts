import { z } from "zod"

// T: an object with fields which have individual Generic Errors from zod validation
export type FieldErrors<T> = {
  [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>,
  error?: string | null,
  data?: TOutput
}

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data)

    // If schema validation fails
    if (!validationResult.success) {
      const flattenedErrors = flattenZodError(validationResult.error);
      return {
        fieldErrors: flattenedErrors as FieldErrors<TInput>
      }
    }

    return handler(validationResult.data)
  }
}

import { ZodError } from "zod";

interface FlattenedError {
  [key: string]: string[]
}

const flattenZodError = (error: ZodError): FlattenedError => {
  const flattened: FlattenedError = {}

  const processError = (path: string[], message: string) => {
    const key = path.join(".")
    if (!flattened[key]) {
      flattened[key] = [];
    }
    flattened[key].push(message);
  };

  error.errors.forEach(err => {
    if (err.path.length > 0) {
      processError(err.path.map(String), err.message);
    }
  });

  return flattened;
};

export default flattenZodError;
