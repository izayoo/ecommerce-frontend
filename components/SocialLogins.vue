<template>
    <div class="d-flex">
        <a @click="signInWithFacebook">
            <v-img style="cursor: pointer" height="35" width="35" src="/img/thirdpartylogos/Facebook.png" class="mr-4" />
        </a>
        <div id="g_id_onload" :data-client_id="googleClientId" data-callback="handleCredentialResponse">
        </div>
        <div class="g_id_signin" data-type="standard"></div>
    </div>
</template>

<script lang="ts" setup>
import { initFacebook, loginWitFacebook } from './../sociallogins/facebook-login';

const config = useRuntimeConfig();

const googleClientId = ref(config.public.googleClientId)


async function signInWithFacebook() {
    const result = await loginWitFacebook();
    console.log(result)
}

declare global {
    interface Window {
        handleCredentialResponse(response: any): any;
    }
}

window.handleCredentialResponse = (response: any) => {
    console.log(parseJwt(response.credentials))
}

function parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

onBeforeMount(() => {
    initFacebook(config.public.fbClientId);
})

useHead({
    title: `Login`,
    script: [
        {
            src: 'https://accounts.google.com/gsi/client',
            body: true
        },
    ],
})
</script>