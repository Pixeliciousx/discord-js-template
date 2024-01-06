module.exports = {
  token: "",
  debug: false,
  clientId: "",
  prefix: ".",
  status: {
    statusType: "idle", //online, idle, dnd, invisible
    activityType: "Custom", //Playing, Streaming, Listening, Watching, Competing, Custom
    name: "custom", //This will not be shown in custom statuses.
    state: "Messing around in the console.", //Use for custom statuses. This is what is shown.
    url: "" //For streaming only, pretty much.
  }
}
