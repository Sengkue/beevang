// plugins/dayjs.js

import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/lo'

dayjs.extend(relativeTime)
dayjs.locale('lo') // set Lao as the global locale

Vue.filter('DateToText', function(value) {
  if (value) {
    return dayjs(String(value)).fromNow()
  }
})


// // plugins/dayjs.js

// import Vue from 'vue'
// import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'
// import 'dayjs/locale/lo'

// dayjs.extend(relativeTime)

// Vue.filter('DateToText', function(value) {
//   if (value) {
//     return dayjs(String(value)).fromNow()
//   }
// })