
Vue.component('register-user', {
  data() {
    return {
      email : '',
      password : '',
      name : ''
    }
  }
  ,
  methods : {
     register() {
      axios({
        method : 'post',
        url : `${serverUrl}/register`,
        data : {
          email : this.email,
          password : this.password,
          name : this.name
        }
      })
      .then(({data}) => {
        console.log(data)
        //kasih notif udah berhasil
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  template : `
  <div class = "card">
  <div class="card card-body">
  <div class = "align-self-center">
  <h2 style="text-align:center">REGISTER</h2>
  <img src="https://www.wildwoodhillsranch.org/wp-content/uploads/2016/10/Register-icon-01.png" alt="..." style="width:200px">
  </div>
<form @submit.prevent="register">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" placeholder="Enter Name" v-model="name">
  </div>
  <div class="form-group">
    <label for="emailRegister">Email address</label>
    <input type="email" class="form-control" id="emailRegister" aria-describedby="emailHelp"
      placeholder="Enter email" v-model="email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="passwordRegister">Password</label>
    <input type="password" class="form-control" id="passwordRegister" placeholder="Password" v-model="password">
  </div>
  <button type="submit" class="btn btn-primary">Register</button>
</form>
</div>
</div>
  `
})

