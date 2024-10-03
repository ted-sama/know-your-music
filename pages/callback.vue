<template>
  <div />
</template>

<script lang="ts" setup>
onMounted(() => {
  const hash: string = window.location.hash;

  const access_token: string | undefined =
    hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      ?.split("=")[1] || "";
  const type: string | undefined =
    hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("token_type"))
      ?.split("=")[1] || "";

  const currentTime: number = Date.now();
  const expires_at: number = currentTime + 3600000; // 1 hour, js operate with milliseconds

  const accessToken = {
    access_token: access_token,
    type: type,
    expires_at: expires_at,
  };

  localStorage.setItem("accessToken", JSON.stringify(accessToken));
  window.location.href = "/";
});
</script>

<style></style>
