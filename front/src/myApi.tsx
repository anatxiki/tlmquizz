const domain = "/api";

export const myApi = {
  get: async function (path: string) {
    return fetch(`${domain}${path}`).then((response) => response.json());
  },
  post: async function (path: string, params?: Object) {
    return fetch(`${domain}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ...(Boolean(params) && { body: JSON.stringify(params) }),
    });
  },
};
