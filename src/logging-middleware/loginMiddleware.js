// logging-middleware/logMiddleware.js

export const logMiddleware = (level, message) => {
  const timestamp = new Date().toISOString();

  switch (level) {
    case "error":
      console.error(`[${timestamp}] ERROR: ${message}`);
      break;
    case "warn":
      console.warn(`[${timestamp}] WARNING: ${message}`);
      break;
    default:
      console.log(`[${timestamp}] INFO: ${message}`);
  }
};
