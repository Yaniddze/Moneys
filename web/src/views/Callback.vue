<template>
    <div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Callback',
    methods: {
      ...mapActions([
        'oidcSignInCallback',
      ]),
    },
    mounted() {
      this.oidcSignInCallback()
        .then((redirectPath) => {
          this.$router.push(redirectPath);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  };
</script>

<style scoped>

</style>
