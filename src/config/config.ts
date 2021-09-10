export const config = () => ({
  config: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT || '4000') || 4000,
  },
});
