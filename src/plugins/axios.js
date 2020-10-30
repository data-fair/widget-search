'use strict'

import Vue from 'vue'
import axios from 'axios'

const _axios = axios.create({})

Plugin.install = function(Vue) {
  Vue.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      },
    },
    $axios: {
      get() {
        return _axios
      },
    },
  })
}

Vue.use(Plugin)

export default Plugin
