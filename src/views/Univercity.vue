<script lang="ts" setup>
  import Navbar from "@/components/Navbar.vue";
  import { ref, computed, onMounted } from "vue";
  import { useUnivercity } from "@/stores/univercity";
  import Alert from "@/components/elements/Alert.vue";
  import Spinner from "@/components/Spinner.vue";

  const univercityStore = useUnivercity();
  const searchCountry = ref<string>("");
  const selectedCountry = ref<string>("");
  const isLoading = ref<boolean>(false);

  const filtredCountries = computed(() => {
    return univercityStore.countries.filter((country) => {
      return country.name.toLocaleLowerCase().includes(searchCountry.value.toLocaleLowerCase());
    });
  });

  const getUnivercity = async (country: string): Promise<void> => {
    isLoading.value = true;
    selectedCountry.value = country;
    await univercityStore.getUnivercity(country);
    isLoading.value = false;
  };

  onMounted(async () => {
    await getUnivercity("Turkey");
  });
</script>
<template>
  <Navbar />
  <div class="container first-letter: mx-auto p-5 lg:p-0 lg:pt-7">
    <div class="dropdown">
      <label tabindex="0" class="btn m-1">
        <span class="text-gray-600" v-if="selectedCountry.length > 0">
          Seçilen ülke <span class="text-orange-500 font-black">{{ selectedCountry }}</span>
        </span>
        <span v-else>Ülke Seçiniz</span>
      </label>
      <div class="dropdown-content bg-base-300 shadow p-4 rounded-box lg:w-96">
        <input type="text" v-model="searchCountry" class="input w-full mb-4 h-14" placeholder="Search" />
        <ul tabindex="0" class="menu flex-nowrap h-80 overflow-y-auto">
          <li v-for="(country, index) in filtredCountries" :key="country.name + index">
            <a class="rounded-md w-full active:bg-orange-500" @click="getUnivercity(country.name)"> {{ country.name }}</a>
          </li>

          <Alert type="error" v-if="filtredCountries.length <= 0">Ülke bulunamadı.</Alert>
        </ul>
      </div>
    </div>

    <Spinner class="flex justify-center" v-if="isLoading" />

    <div class="overflow-x-auto my-5">
      <table class="table table-zebra w-full" v-if="univercityStore.univercities.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>Üniversite Adı</th>
            <th>Resmi Sitesi</th>
            <th>Ülkesi</th>
            <th>Ülke Kodu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(univercity, index) in univercityStore.univercities" :key="univercity.name + index">
            <th>{{ index + 1 }}</th>
            <td>{{ univercity.name }}</td>
            <td>
              <a
                :href="`https://www.${domain}`"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-orange-500 underline"
                v-for="(domain, index) in univercity.domains"
                :key="domain + index"
              >
                {{ domain }}
              </a>
            </td>
            <td>{{ univercity.country }}</td>
            <td>{{ univercity.alpha_two_code }}</td>
          </tr>
        </tbody>
      </table>
      <Alert type="error" v-if="univercityStore.univercities.length <= 0 && !isLoading">
        <strong>{{ selectedCountry }}</strong> ülkesine ait üniversite bulunamadı.
      </Alert>
    </div>
  </div>
</template>

<style lang="css" scoped>
  .menu::-webkit-scrollbar {
    @apply w-2 bg-base-200 opacity-5 pl-2;
  }
  .menu::-webkit-scrollbar-track {
    @apply bg-base-100;
  }
</style>
