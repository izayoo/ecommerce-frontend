import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const instance = axios.create({
    baseURL: config.public.apiBase,
    timeout: 10000,
  });

  instance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer '+localStorage.getItem('token')
    return config
  })

  //response interceptor
  instance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const router = useRouter()
    const route = useRoute()
    const response = error.response

    if (response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      if(route.path.includes('admin')){
        router.replace({ path: '/admin-login' })
      }else{
        router.replace({ path: '/login' })
      }
    }

    return Promise.reject(error);
  });

  return { provide: { axios: instance } };
});
