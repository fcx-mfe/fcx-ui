import Axios from "axios";
import PubSub, { subscribe } from "pubsub-js";
import { setupCache } from "axios-cache-interceptor";
import MessageEncryptionService from "./messageEncryptionService"; // Import the service

window.MessageEncryptionService = MessageEncryptionService;

const axios = setupCache(Axios);

// const lifecycles = singleSpaReact({
//   React,
//   ReactDOM,
//   rootComponent: Root,
//   errorBoundary(err, info, props) {
//     // Customize the root error boundary for your microfrontend here.
//     return null;
//   },
// });

// export const { bootstrap, mount, unmount } = lifecycles;

function APIClient(baseURL) {
  const _baseURL = baseURL;
  return function (resource) {
    const baseURL = _baseURL;

    return {
      get: async (id = "") => {
        const url = `${baseURL}/${resource}/${id}`;
        const interceptor = {
          id: id ? `get-${resource}-${id}` : `get-${resource}`,
        };

        // return fetch(url).then((response) => response.json());
        return axios.get(url, interceptor).then((response) => response.data);
      },

      create: async (requestData) => {
        const url = `${baseURL}/${resource}`;
        const request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        };

        // return fetch(url, request).then((response) => response.json());
        return axios.post(url, requestData).then((response) => response.data);
      },

      update: async (id, requestData) => {
        const url = `${baseURL}/${resource}/${id}`;
        const request = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        };

        // return fetch(url, request).then((response) => response.json());
        return axios.put(url, requestData).then((response) => response.data);
      },

      delete: (id) => {
        const url = `${baseURL}/${resource}/${id}`;
        const request = { method: "DELETE" };
        const interceptor = {
          cache: {
            update: {},
          },
        };

        interceptor.cache.update[`get-${resource}`] = "delete";

        // return fetch(url, request)
        //   .then(response => {
        //     if (response.ok) {
        //       return response;
        //     }

        //     throw(response);
        //   });

        return axios.delete(url, interceptor).then((response) => response.data);
      },
    };
  };
}

const REST_METHODS = [
  { id: "GET", funcName: "get" },
  { id: "CREATE", funcName: "create" },
  { id: "UPDATE", funcName: "update" },
  { id: "DELETE", funcName: "delete" },
];

// function APIEventBusLegacy({ baseURL, resources }) {
//   const apiClient = new APIClient(baseURL);

//   const subscribe = ({ method, resource }) => {
//     const ACTION = `EVENTS.${resource}_${method.id}`;

//     PubSub.subscribe(ACTION, (type, params) => {
//       apiClient(resource.toLowerCase())
//         [method.funcName](params)
//         .then((data) => {
//           PubSub.publish(`${ACTION}_SUCCEEDED`, data);
//         })
//         .catch((error) => {
//           PubSub.publish(`${ACTION}_FAILED`, error);
//         });
//     });
//   };

//   REST_METHODS.forEach((method) => {
//     resources.forEach((resource) => {
//       subscribe({ method, resource });
//     });
//   });

//   return {
//     apiClient,
//     unsubscribe: () => {},
//     unsubscribeAll: () => {},
//   };
// }

async function APIEventBus({ baseURL, resources }) {
  const apiClient = new APIClient(baseURL);
  const aesKey = await MessageEncryptionService.getEncryptedAESKey();
  await MessageEncryptionService.encryptAESKeyWithRSA(aesKey);

  const subscribe = ({ method, resource }) => {
    const ACTION = `EVENTS.${resource}_${method.id}`;

    PubSub.subscribe(ACTION, async (type, data) => {
      let params;

      if (data) {
        const { encryptedData, iv } = data;
        const decryptedData = await MessageEncryptionService.decryptData(
          { encryptedData, iv },
          aesKey
        );
        params = JSON.parse(decryptedData);
      }

      apiClient(resource.toLowerCase())
        [method.funcName](params)
        .then(async (data) => {
          const { encryptedData, iv } =
            await MessageEncryptionService.encryptData(
              JSON.stringify(data),
              aesKey
            );
          PubSub.publish(`${ACTION}_SUCCEEDED`, { encryptedData, iv });
        })
        .catch((error) => {
          PubSub.publish(`${ACTION}_FAILED`, error);
        });
    });
  };

  REST_METHODS.forEach((method) => {
    resources.forEach((resource) => {
      subscribe({ method, resource });
    });
  });

  return {
    apiClient,
    unsubscribe: () => {},
    unsubscribeAll: () => {},
  };
}

function SharedAPIClient() {
  const instances = {};

  return {
    getInstance: async ({ name, baseURL, resources }) => {
      const instance = instances[name];

      if (!instance) {
        instances[name] = await new APIEventBus({ baseURL, resources });
      }

      return instance;
    },

    removeInstance: (name) => {
      return delete instances[name];
    },
  };
}

export default new SharedAPIClient();
