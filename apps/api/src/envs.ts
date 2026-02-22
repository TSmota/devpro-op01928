import { loadEnvFile } from "node:process"

try {
  loadEnvFile()
} catch {
  console.warn('No .env file found, relying on environment variables')
}

/**
 * Obtain the value of an environment variable, with an optional default value.
 * 
 * @param name The name of the environment variable to retrieve
 * @param defaultValue The default value to return if the environment variable is not set (optional)
 * @returns The value of the environment variable or the default value if not set
 */
export function getEnvVariable(name: string, defaultValue?: string): string {
  const value = process.env[name]

  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    throw new Error(`Environment variable ${name} is not set`)
  }

  return value
}

/**
 * Validate required environment variables at startup
 * @throws Error if any required variable is missing
 */
export function validateEnv(): void {
  const requiredVars = ['OPENWEATHERMAP_API_KEY']
  const missingVars: string[] = []

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName)
    }
  }

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
  }

  console.log('✓ Environment variables validated')
}
