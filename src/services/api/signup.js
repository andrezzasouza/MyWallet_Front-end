import api from './api';

export function signup (body) {
  return api.post('/sign-up', {
    body
  })
}

// export function signup (e) {
//   return api.post('/sign-up', {
//     e.preventDefaul();
//   })
// }