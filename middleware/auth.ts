export default defineNuxtRouteMiddleware(async (to) => {
  const router = useRouter();
  if (!localStorage.getItem('token')) {
    router.push('/')
  }
})
