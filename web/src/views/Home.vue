<template>
  <div class='home'>
    <img alt='Vue logo' src='../assets/logo.png'>
    <div class='home'>
      <p v-if='isLoggedIn'>User: {{ username }}</p>
      <button class='btn' @click='login' v-if='!isLoggedIn'>Login</button>
      <button class='btn' @click='logout' v-if='isLoggedIn'>Logout</button>
      <button class='btn' @click='getProtectedApiData' v-if='isLoggedIn'>Get API data</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import AuthService from '@/configuration/AuthService';
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

  const auth = new AuthService();

  @Options({
    components: {
      HelloWorld,
    },
  })
  export default class Home extends Vue {
    public currentUser = '';

    public accessTokenExpired = false;

    public isLoggedIn = false;

    get username() {
      return this.currentUser;
    }

    public login = () => {
      auth.login();
    }

    public logout = () => {
      auth.logout();
    }

    public mounted() {
      auth.getUser()
        .then((user) => {
          if (user) {
            console.log('HERE');
            this.currentUser = user.profile.name ?? '';
            this.accessTokenExpired = user.expired;
            this.isLoggedIn = (user !== null && !user.expired);
          }
        });
    }
  }
</script>
