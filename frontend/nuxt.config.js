import colors from "vuetify/es5/util/colors"

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - frontend",
    title: "frontend",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://localhost:3005/api/",
  },

    auth: {
    watchLoggedIn: true,
    resetOnError: true,
    localStorage: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "token",
          },
          logout: false,
          user: {
            url: "/session/user",
            method: "get",
            propertyName: "user",
          },
        },
        tokenType: "Bearer",
        autoLogout: true,
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true, 
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: "Home",
          path: "/",
          component: resolve(__dirname, "pages/index"),
        },
        {
          name: "Login",
          path: "/login",
          component: resolve(__dirname, "pages/auth/login"),
        },
        {
          name: "Register",
          path: "/register",
          component: resolve(__dirname, "pages/auth/register"),
        },
        {
          name: "Detail",
          path: "/detail/:id",
          component: resolve(__dirname, "pages/object/detail"),
        },
        {
          name: "Edit",
          path: "/edit/:id",
          component: resolve(__dirname, "pages/object/edit"),
        },
        {
          name: "List",
          path: "/list",
          component: resolve(__dirname, "pages/object/list"),
        }
      )
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
