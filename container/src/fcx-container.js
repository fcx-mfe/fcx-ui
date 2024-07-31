import { registerApplication, start, navigateToUrl } from "single-spa";
import SharedAPIClient, { ASD } from "@fcx/api-client";

console.log(ASD);
window.MessageEncryptionService = ASD();

(async () => {
  await SharedAPIClient.getInstance({
    name: "products-service",
    baseURL: "http://localhost:9090",
    resources: ["PRODUCTS", "CATEGORIES"],
  });
})();

registerApplication({
  name: "@fcx/nav",
  app: () => System.import("@fcx/nav"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@fcx/home",
  app: () => System.import("@fcx/home"),
  activeWhen: ["/home"],
});

registerApplication({
  name: "@fcx/products",
  app: () => System.import("@fcx/products"),
  activeWhen: ["/product-listing", "/product-details"],
});

registerApplication({
  name: "@fcx/auth",
  app: () => System.import("@fcx/auth"),
  activeWhen: ["/login"],
});

start({
  urlRerouteOnly: true,
});

navigateToUrl("/home");
