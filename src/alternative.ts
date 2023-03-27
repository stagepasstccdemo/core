import { registerApplication, start } from "single-spa";

const apps = [
  {
    name: "@stagepass/app-events",
    package: "@stagepass/app-event",
    activeWhen: ["/events"],
    // activeWhen: (location) => !location.pathname.startsWith("/blank"),
  },
];

apps.forEach((app) => {
  registerApplication({
    name: app.name,
    app: () => System.import<any>(app.package),
    activeWhen: app.activeWhen,
  });
});

start();
