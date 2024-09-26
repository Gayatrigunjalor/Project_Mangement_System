import { validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(error => ({
        value: error.value,
        field: error.path,
        msg: error.msg
      }));
      return res.status(400).json({ errors: formattedErrors });
    }
  next();
};

export default handleValidationErrors;