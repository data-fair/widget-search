import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import Vuetify from 'vuetify/lib'

Vue.config.productionTip = false
Vue.use(Vuetify)

const elements = document.querySelectorAll('[data-df-search-widget]')
for (const element of elements) {
  const props = {
    primaryColor: '#2196F3', // blue
  }
  for (const attr of element.attributes) {
    if (attr.name === 'data-df-url') props.dfUrl = attr.value
    if (attr.name === 'data-dataset-id') props.datasetId = attr.value
    if (attr.name === 'data-dark') props.dark = attr.value !== false
    if (attr.name === 'data-primary-color') props.primaryColor = attr.value
  }
  console.log(props)
  const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: props.primaryColor,
        },
        dark: {
          primary: props.primaryColor,
        },
      },
    },
  })
  new Vue({
    vuetify,
    render: h => h(App, { props }),
  }).$mount(element)
}
