export default () => ({
  isProduction: process.env.NODE_ENV === 'production',
  SERVER_PORT: process.env.SERVER_PORT || 3000,
});
