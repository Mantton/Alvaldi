import app from "./app";
import { PORT } from "./config/env";

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default server;
