<template>
  <div>
    <h3>My</h3>
    <h4>MyName:{{ username }}</h4>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: ''
      }
    },
    mounted() {
      let user = sessionStorage.getItem('user')
      if (user) {
        user = JSON.parse(user)
        this.username = user.username
      }
    }
  }
</script>

<style scoped>

</style>
