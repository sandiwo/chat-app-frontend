import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import router from './router'
import vuetify from './plugins/vuetify'
import vueDebounce from 'vue-debounce'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
}))

Vue.use(require('vue-moment'))

Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup'],
})

new Vue({
  router,

  sockets: {
    connect: function() {
      const user = JSON.parse(localStorage.getItem('user'))
      this.$socket.emit('userConnect', user)
    }, 
    disconnect: function() {
      const user = JSON.parse(localStorage.getItem('user'))
      this.$socket.emit('userDisconnect', user)
    }
  },

  vuetify,
  render: h => h(App)
}).$mount('#app')
