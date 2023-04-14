import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

const routes = constructRoutes(microfrontendLayout);

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();

Sentry.init({
  dsn: "https://094713d97e6c445abd8e7642f84dd0fb@o4504899977936896.ingest.sentry.io/4504917238743040",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});
