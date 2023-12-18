import { format, parseISO } from "date-fns";

export default defineNuxtPlugin((nuxtApp) => {

  /**
   * Check current user role
   * @param {string} role 
   */
  function isRole(role: string) {
    return localStorage.getItem('role') === role;
  }

  /**
   * Check if ther is a autthenticated user
   */
  function isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Number display format
   * 
   * @param {number} number
   */
  function numberDisplayFormat(number : number) {
    return Math.trunc(number).toLocaleString('en', { })
  }

  /**
   * Display date only
   */
  function dateDisplayFormat(timestamp: string){
    return format(parseISO(timestamp), 'P');
  }

  return {
    provide: {
      isRole,
      isAuthenticated,
      numberDisplayFormat,
      dateDisplayFormat,
    }
  };
});
