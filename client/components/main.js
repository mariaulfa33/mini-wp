const serverUrl = 'http://localhost:3000'

const app = new Vue({
  el : "#app",
  data : {
    articles : [],
    myArticles : [],
    editedArticle : {},
    showLogin : false,
    showArticle : true,
    showRegister: false,
    showMyStory : false,
    isLogin : false,
    showForm : false,
    search : ''
  },
  created() {
    this.getAllData()
    if(localStorage.getItem('token')) {
      this.getMyArticles()
      this.isLogin = true
    } else {

    }
  },
  computed : {
    
  },
  methods : {
    login(payload) {
      if(payload) {
        this.showLogin = payload
        this.showArticle = false
        this.showRegister = false
        this.showForm = false
      } else {
        this.isLogin = false
        this.home()
      }
    },
    getAllData() {
      axios({
        method : 'get',
        url : `${serverUrl}/articles`
      })
      .then(({data}) => {
        this.articles = data
        console.log(this.articles)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getMyArticles() {
    axios({
      method : 'get',
      url : `${serverUrl}/articles/user`,
      headers : {
        token : localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      this.myArticles = data
    })
    .catch(err => {
      localStorage.removeItem('token')
    })
    },
    home() {
      this.showLogin = false
      this.showArticle = true
      this.showRegister= false
      this.showMyStory = false
      this.showForm = false
    },
    mystory() {
      this.showLogin = false
      this.showArticle = false
      this.showMyStory = true
      this.showRegister= false
      this.showForm = false
      this.isLogin = true
    },
    inputStory(payload) {
      this.myArticles = payload
      if(this.myArticles) {
        this.mystory()
      }
    }, 
    register(payload) {
      this.showRegister = payload
      this.showArticle = false
      this.showLogin = false
      this.showForm = false
      
    }, 
    createStory() {
      this.showLogin = false
      this.showArticle = false
      this.showRegister = false
      this.showForm = true
      this.showMyStory = false
      this.editedArticle = {}

    }, 
    pushStory(payload) {
      this.myArticles.unshift(payload)
      this.articles.unshift(payload)
      this.mystory()

    }, 
    editArticle(payload) {
      this.createStory()
      this.editedArticle = payload
      // console.log('AWAL : ', this.editedArticle)    
    }, 

    editstory(payload) {
      this.editedArticle = payload
      this.getAllData()
      this.getMyArticles()
      this.mystory()
      // console.log('AKHIR : ', this.editedArticle)    
    },

    cancelEdit(payload) {
      this.mystory()
    },
    
    deleteArticle(payload) {
      this.getAllData()
      this.getMyArticles()
      this.mystory()
    }, 
    searchArticle() {
      if(this.search != '') {
        axios({
          method : 'get',
          url : `${serverUrl}/search?search=${this.search}`
        })
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        this.getAllData()
      }
    }
  },
}) 