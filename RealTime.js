/// <reference path="C:/Users/Administrator/Documents/WORKDIR/HelperLib/src/index.d.ts" />

// Register Plugin
const plugin = {
  Name: "RealTime",
  Introduction: "Sync real time",
  Version: [0, 0, 2],
  Other: {
    Author: "dmbkstudio",
    Github: "https://github.com/dmbkstudio/RealTime",
    License: "GPL-3.0 license",
  },
};
ll.registerPlugin(
  plugin.Name,
  plugin.Introduction,
  plugin.Version,
  plugin.Other
);

// Plugin Variables
const pluginPath = "./plugins/" + plugin.Name + "/";

// Create Config File
const config = new JsonConfigFile(
  pluginPath + "config.json",
  JSON.stringify({
    syncInterval: 10000,
  })
);

// Get Real Time
const getTimeObj = () => {
  system.getTimeObj();
};

// Convert Real Time to Tick Game Time
const timeObjToTick = (timeObj) => {
  const { h } = timeObj;
  const time = (h * 1000 - 8000 + 24000) % 24000;
  return time;
};

// Sync Game Time to Real Time
const syncGameTimeToRealTime = () => {
  const currentTimeObj = system.getTimeObj();
  const gameTime = timeObjToTick(currentTimeObj);
  mc.setTime(gameTime);
};

// Regularly execute time synchronization
const syncInterval = parseInt(config.get("syncInterval"));
setInterval(syncGameTimeToRealTime, syncInterval);

// Listen pkayer is on bed
mc.listen("onBedEnter", (_player) => {
  return false;
});
