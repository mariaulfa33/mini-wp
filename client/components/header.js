Vue.component('top-header', {
  props : ['statuslogin'],
  data() {
    return {
    }
  },
  methods: {
    login() {
      this.$emit('show-login', true)
      
    },
    register() {
      this.$emit('show-register', true)
    },
    logout() {
      localStorage.removeItem('token')
      this.$emit('show-login', false)
      if(gapi.auth2) {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        })
      }

      swal("your article is great!", "can't wait for more", "success")
    }
  },
  template: `
  <div class="card-body">
    <div class="row">
      <div class="col-4">
        <img src="../6d1cfc50-0ff4-4bb3-8a7b-f5fe2dae4a2a.png" alt="...">
      </div>
      <div class="col-8 d-flex justify-content-end row">
        <div class="align-self-center">
          <button class="btn btn-primary" type="button" @click="login" v-if="!statuslogin">
            login
          </button>
          <button class="btn btn-primary" type="button" @click="register" v-if="!statuslogin">
            register
          </button>
          <button class="btn btn-primary" type="button" @click="logout" v-if="statuslogin">
          Logout
        </button>
        </div>
      </div>
  </div> 
</div>
  `
})