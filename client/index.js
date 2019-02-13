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
    articles: [],
    updateArticle : {},
    files : []
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
      if(this.action == 'edit') {
        axios.put(`${databaseUrl}/articles`, {
          id : this.id,
          title : this.newTitle,
          content : this.newArticle,
          created_at : new Date(), 
        })
        .then(({data}) => {
          this.updateArticle.title = this.newTitle
          this.updateArticle.content = this.newArticle
          this.newArticle = ''
          this.newTitle = ''
        })
        .catch(err => {
          console.error(err)
        })
      } else {
        const formData = new FormData()
        formData.append('image', this.files[0])
        formData.append('title', this.newTitle)
        formData.append('content', this.newArticle)
        console.log(this.files)
        axios({
          method : 'post', 
          url : `${databaseUrl}/articles`,
          headers : {"Content-Type" : 'multipart/form-data'},
          data : formData
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
      this.updateArticle = data
      this.index = index
      this.action = 'edit'
      this.id = data._id
      this.newArticle = data.content
      this.newTitle = data.title
      this.$refs['edit'].click()
      
    }, write(action = this.action) {
      this.id = ''
      this.action = 'write'
      this.newArticle = ''
      this.newTitle = ''
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
    }, previewFiles() {
      this.files = this.$refs.myFiles.files
    }
  }
})