export type ErrorHandlers<Err extends Record<string, unknown> = Record<string, unknown>> = {
  catcher: (error: Error) => void;
  catcherValidator: (params: {
    setErrors: (errors: Err) => void;
    getMessage: (code: string, graphqlError: Error, apolloError: Error) => string;
  }) => (error: Error) => void;
};

export type ValidatorSchema<K extends string> = Partial<Record<K, string[]>>;

export const createErrorHandlers = <
  Keys extends string = string,
  Err extends Record<string, unknown> = Record<string, unknown>
>(
  handle: (code: string | null, error: Error) => void,
  validatorSchema?: ValidatorSchema<Keys>
): ErrorHandlers<Err> => ({
  catcher: (error) => {
    handle((error as unknown as { data: string }).data, error);
  },
  catcherValidator: ({ setErrors, getMessage }) => {
    const keys = Object.keys(validatorSchema || {}) as Keys[];
    return (error) => {
      const err = error as Error & { data: string };
      const index = keys.findIndex((key) => validatorSchema[key].includes(err.data));
      if (index !== -1) {
        const key = keys[index];
        setErrors({ [key]: getMessage(err.data as string, err, error) } as Err);
      } else {
        handle(err.data as string, error);
      }
    };
  },
});
