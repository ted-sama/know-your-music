<template>
  <div class="flex flex-col justify-center items-center pt-32">
    <h1 class="text-4xl mb-4">Guess the song</h1>
    <Button as-child>
      <a :href="`${loginEndpoint}`">Log in {{ $config.public.authUrl }} {{ $config.public.scopes }}</a>
    </Button>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const scopes = ["user-library-read"];

const loginEndpoint = `${config.public.authUrl}?client_id=${config.public.clientId}&redirect_uri=${config.public.redirectUri}&scope=${scopes[0]}&response_type=${config.public.responseType}&show_dialog=true`;
</script>

<style></style>