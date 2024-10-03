<template>
  <div class="flex flex-col justify-center items-center pt-32">
    <h1 class="text-4xl mb-4">Guess the song</h1>
    <div v-if="accessToken === null">
      <Button as-child>
        <a :href="`${loginEndpoint}`">Log in</a>
      </Button>
    </div>
    <div v-else>
      <Input
        v-model="search"
        placeholder="Search one of your favorite song"
        class="w-[32rem]"
      />
      <div
        v-show="searchResults.length > 0"
        class="bg-background rounded-xl border border-border my-3 p-4 w-[32rem]"
      >
        <ul class="space-y-2">
          <li v-for="track in searchResults" :key="track.id">
            <div
              class="flex items-center rounded-sm p-2 transition-all ease-in-out duration-75 cursor-pointer hover:bg-white/10"
            >
              <img :src="track.album.images[0].url" alt="" class="w-10 mr-4">
              <p>{{ track.name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// TODO: maybe add added date like an hint for the user
const config = useRuntimeConfig();
const scopes = ["user-library-read"];
const loginEndpoint = `${config.public.authUrl}?client_id=${config.public.clientId}&redirect_uri=${config.public.redirectUri}&scope=${scopes[0]}&response_type=${config.public.responseType}&show_dialog=true`;
const accessToken = ref<{
  access_token: string;
  expires_at: number;
  type: string;
} | null>(null);

const tracks = ref<SavedTrackObject[]>([]);
const trackToGuess = ref<SavedTrackObject | null>(null);

const search = ref<string>("");
const searchResults = ref<Track[]>([]);

const handleSearch = async () => {
  if (!search.value) {
    searchResults.value = [];
    return;
  }

  const url = `https://api.spotify.com/v1/search?q=${search.value}&type=track&limit=10`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken.value?.access_token}`,
    },
  });

  const data = await response.json();
  searchResults.value = data.tracks.items;

  console.log(data);
};

const fetchSavedTracks = async (): Promise<SavedTrackObject[]> => {
  if (!accessToken.value) return [];

  const initialUrl = "https://api.spotify.com/v1/me/tracks?limit=50";
  const initialResponse = await fetch(initialUrl, {
    headers: {
      Authorization: `Bearer ${accessToken.value.access_token}`,
    },
  });

  const initialData = await initialResponse.json();
  const total = initialData.total;
  const limit = 50;
  const totalPages = Math.ceil(total / limit);

  const urls = Array.from(
    { length: totalPages },
    (_, i) => `${initialUrl}&offset=${i * limit}`,
  );

  const fetchPromises = urls.map((url) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken.value?.access_token}`,
      },
    }).then((response) => response.json()),
  );

  const results = await Promise.all(fetchPromises);
  const tracks = results.flatMap((data) => data.items);

  return tracks;
};

onMounted(async () => {
  if (import.meta.client) {
    accessToken.value = JSON.parse(
      localStorage.getItem("accessToken") || "null",
    );
  }

  // Fetch saved tracks
  tracks.value = await fetchSavedTracks();

  if (tracks.value.length > 0) {
    trackToGuess.value =
      tracks.value[Math.floor(Math.random() * tracks.value.length)];
    console.log(trackToGuess.value);
  }
});

watch(search, () => {
  handleSearch();
});
</script>

<style></style>
