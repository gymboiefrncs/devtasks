import fs from "fs";
import os from "os";
import path from "path";

export const getDbPath = (): string => {
  const CONFIG_DIR = path.join(os.homedir(), ".devplan");
  const CONFIG_PATH = path.join(CONFIG_DIR, "devplan.db");

  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  return CONFIG_PATH;
};
