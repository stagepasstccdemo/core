import { registerApplication, start } from "single-spa";

const apps = [
  {
    name: "@stagepass/app-auth",
    package: "@stagepass/app-auth",
    activeWhen: ["/auth", "/"],
    // activeWhen: (location) => !location.pathname.startsWith("/blank"),
  },
  {
    name: "@stagepass/app-events",
    package: "@stagepass/app-events",
    // activeWhen: ["/events", "/event"],
    activeWhen: (location) => location.pathname.startsWith("/event"),
  },
];

apps.forEach((app) => {
  registerApplication({
    name: app.package,
    app: () => System.import<any>(app.package),
    activeWhen: app.activeWhen,
  });
});

start({
  urlRerouteOnly: true,
});
