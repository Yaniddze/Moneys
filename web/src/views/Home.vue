<template>
  <div
    v-if="oidcIsAuthenticated"
    class="protected"
  >
    <h1>This route requires authentication</h1>
    <h1>{{ oidcUser.preferred_username }}</h1>
    <button @click="signOutOidc">Выйти</button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import jsonMarkup from 'json-markup';
  import SignedInUser from '@/components/SignedInUser.vue';

  export default {
    name: 'Protected',
    components: { SignedInUser },
    computed: {
      ...mapGetters([
        'oidcIsAuthenticated',
        'oidcUser',
      ]),
      userDisplay() {
        return jsonMarkup(this.oidcUser);
      },
    },
    methods: {
      ...mapActions(['signOutOidc']),
    },
  };
</script>
