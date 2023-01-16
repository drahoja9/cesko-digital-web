#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

import { getUserProfile } from "lib/airtable/user-profile";

async function main() {
  const [_, __, userId] = process.argv;
  const user = await getUserProfile(userId);
  console.log(JSON.stringify(user, null, 2));
}

main().catch((error) => console.log(error));
