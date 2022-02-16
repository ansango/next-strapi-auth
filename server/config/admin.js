module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'fdc41bd717801d8abf8a6397480b545e'),
  },
});
