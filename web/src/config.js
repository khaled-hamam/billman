export const config = {
  authUrl: import.meta.env.SNOWPACK_PUBLIC_AUTH_URL || 'http://localhost:3000',
  appUrl: import.meta.env.SNOWPACK_PUBLIC_APP_URL || 'http://localhost:8081',
}
