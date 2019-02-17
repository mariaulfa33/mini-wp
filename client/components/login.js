
Vue.component('login-user', {
  data() {
    return {
      email : '',
      password : ''
    }
  }, 
  props : ['showLogin']
  ,
  mounted() {
    gapi.signin2.render('google-signin-btn', { // this is the button "id"
      onsuccess: this.onSignIn // note, no "()" here
    })
  },
  methods : {
    onSignIn (user) {
      // do stuff, for example
      // const profile = user.getBasicProfile()
      const Id_token = user.getAuthResponse().id_token
      axios({
        method : 'post',
        url : `${serverUrl}/logingoogle`,
        headers : {
          token : Id_token
        }
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        this.getUserData()
      })
      .catch(err => {
        console.log(err)
      })
    },
     login() {
      axios({
        method : 'post',
        url : `${serverUrl}/login`,
        data : {
          email : this.email,
          password : this.password
        }
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        this.getUserData()
        swal("Hello!", "Welcome Back!", "success")
      })
      .catch(err => {
        this.$emit('is-login', false)
        swal("Sorry!", "we've got some problems", "error")
      })
    },
    getUserData() {
      axios({
        method : 'get',
        url : `${serverUrl}/articles/user`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$emit('my-story', data)
      })
      .catch(err => {
        swal("Sorry!", "we've got some problems", "error")
        this.$emit('is-login', false)
      })
    }
  },
  template : `
    <div class="card" id="login">
    <div class="card card-body" style="">
    <div class="align-self-center">
    <h2 style="text-align : center"> LOGIN </h2>
    <img src= "../person_1058425.png" alt="..." style="width : 300px">
    </div>  
    <form @submit.prevent="login">
        <div class="form-group">
          <label for="emailLogin">Email address</label>
          <input type="email" class="form-control" id="emailLogin" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="passwordLogin">Password</label>
          <input type="password" class="form-control" id="passwordLogin" placeholder="Password" v-model="password">
        </div>
        <div id="google-signin-btn"></div> <br>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
  `
})