require("tsconfig-paths/register");

import cache from "@/clients/cache";

const teardown = async () => {
  await cache.disconnect();
};

export default teardown;
