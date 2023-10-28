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
  dsn: "INSERT_YOUR_SENTRY_DSN_HERE",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  beforeSend: (event) => {
    if (window.location.hostname === "localhost") {
      return null;
    }
    return event;
  },
});
