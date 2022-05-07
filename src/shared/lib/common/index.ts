export function hasValue<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function getEnvVariable(key: string) {
  const envVariable = process.env[key];

  if (!envVariable) {
    throw new Error(`Env variable ${key} is required`);
  }

  return envVariable;
}
