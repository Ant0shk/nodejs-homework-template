const messageList = {
  200: "OK",
  201: "Created",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  console.log("error===>", error);
  error.status = status;
  return error;
};

export default HttpError;
