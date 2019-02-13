const databaseUrl = 'http://localhost:3000'

$('.close').click(function() {
  $('.modal').hide()
})

$(document).ready(function () {
  $('.sidenav').sidenav()
})
$(".dropdown-trigger").dropdown()
$(document).ready(function () {
  $('.tabs').tabs();
})

$(document).ready(function(){
  $('.collapsible').collapsible()

})

const app = new Vue({
  el: "#app",
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  created() {
    axios.get(`${databaseUrl}/articles`)
      .then(({
        data
      }) => {
        this.articles = data
      })
      .catch(err => {
        console.error(err)
      })
  },
  data: {
    search_article :'',
    index : '',
    action : '',
    id : '',
    newArticle: '',
    newTitle: '',
    articles: []
  },
  computed : {
    filterArticle() {
      let articles = this.articles
      if(this.search_article) {
        return articles.filter(search => {
          return search.title.indexOf(this.search_article) !== -1
        })
      } else {
        return this.articles
      }
    }
  },
  methods: {
    addArticle() {
      if(this.action != 'write') {
        axios.put(`${databaseUrl}/articles`, {
          id : this.id,
          title : this.newTitle,
          content : this.newArticle,
          created_at : new Date()
        })
        .then(({data}) => {
          this.id = ''
          this.newArticle = ''
          this.newTitle = ''
          // this.articles[this.index] = data
        })
        .catch(err => {
          console.error(err)
        })
      } else {
        axios.post(`${databaseUrl}/articles`, {
          title : this.newTitle,
          content : this.newArticle,
          created_at : new Date()
        })
        .then(({data}) => {
          this.articles.push(data)
          this.newArticle = ''
          this.newTitle = ''
        })
        .catch(err => {
          console.error(err)
        })
      }
      this.$refs['article'].click()

    },showDetail(data) {
      this.$refs['detail'].click()
      $(document).ready(function(){
        $('.modal').show()
      })
      this.action = 'show'
      this.id = data._id
      this.newArticle = data.content
      this.newTitle = data.title

    },showArticle(data) {
      this.id = data._id
      this.newArticle = data.content
      this.newTitle = data.title
    },
    editArticle(data, index) {
      this.index = index
      this.action = 'edit'
      this.id = data._id
      this.newArticle = data.content
      this.newTitle = data.title
      // this.$refs['write'].click()
      
    }, write(action = "write") {
      if(action != 'edit') {
        this.id = ''
        this.action = 'write'
        this.newArticle = ''
        this.newTitle = ''
      }
   

    }, deleteArticle(data, index) {
      axios({
        method : 'delete', 
        url : `${databaseUrl}/articles`,
        data : {
          id : data._id
        }
      })
      .then(({data}) => {
        this.articles.splice(index, 1)
      })
      .catch(err => {
        console.error(err)
      })
    }
  }
})