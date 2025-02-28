export const successResponse = ({ data, code = 200, res }) => {
  res.status(code).json({ message: data });
};

export const errorResponse = ({ error, code = 500, res }) => {
  res.status(code).json({ message: error.message });
};
