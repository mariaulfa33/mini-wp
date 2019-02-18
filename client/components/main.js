const serverUrl = 'http://35.240.209.99'

const app = new Vue({
  el : "#app",
  data : {
    articles : [],
    myArticles : [],
    editedArticle : {},
    searchedArticles : [],
    search : '',
    showLogin : false,
    showArticle : true,
    showRegister: false,
    showMyStory : false,
    isLogin : false,
    showForm : false,
    showSearch : false
  },
  created() {
    this.getAllData()
    if(localStorage.getItem('token')) {
      this.getMyArticles()
      this.isLogin = true
    } else {

    }
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
      this.showSearch = false
    },
    mystory() {
      this.showLogin = false
      this.showArticle = false
      this.showMyStory = true
      this.showRegister= false
      this.showForm = false
      this.showSearch = false
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
      this.showSearch = false
      
    }, 
    createStory() {
      this.showLogin = false
      this.showArticle = false
      this.showRegister = false
      this.showForm = true
      this.showMyStory = false
      this.showSearch = false
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
    }, 

    editstory(payload) {
      this.editedArticle = payload
      this.getAllData()
      this.getMyArticles()
      this.mystory()   
    },

    cancelEdit(payload) {
      this.mystory()
    },
    
    deleteArticle(payload) {
      this.getAllData()
      this.getMyArticles()
      this.mystory()
    }, 
    searchArticle(payload) {
      let search
      if(this.search == '') {
        search = payload
      } else {
        search = this.search
      }
      axios({
        method : 'get',
        url : `${serverUrl}/search?search=${search}`
      })
      .then(({data}) => {
        this.searchedArticles = data
        this.showLogin = false
        this.showArticle = false
        this.showRegister = false
        this.showForm = false
        this.showMyStory = false
        this.showSearch = true
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
}) 