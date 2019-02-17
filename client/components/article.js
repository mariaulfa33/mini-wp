Vue.component('article-user', {
  props: ['article', 'showmyarticle', 'showarticle'],
  data() {
    return {
    }
  },
  methods: {
    getDate(date) {
      let month = {
        0: 'january',
        1: 'february',
        2: 'march',
        3: 'april',
        4: 'may',
        5: 'june',
        6: 'july',
        7: 'august',
        8: 'september',
        9: 'october',
        10: 'november',
        11: 'december'
      }
      return `${new Date(date).getDate()} ${month[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`
    },
    editArticle(article) {
      this.$emit('edit-article', article)
    },
    deleteArticle(article) {
      axios({
        method : 'delete',
        url : `${serverUrl}/articles/${article._id}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$emit('delete-article', data)
      }) 
      .catch(err => {
        console.log(err)
      })
    }, 
    searchByTag(value) {
      console.log(value)
    }
  },
  template: `
  <div>
    <h3 class="card-header">{{article.title}}</h3>
    <div class="card-body align-self-center">
      <p>
      <img class="mx-auto d-block" style="width: 50%;" :src="article.feature_image" alt="Card image">
      </p>
      <p class="card-text">{{article.description}}</p>
      <p v-html="article.content"> </p>
    </div>
    <div class="card-body" v-if="showarticle">
      <p>Author: </p>
      <a href="#" class="card-link" v-if="article.author">{{article.author.name}}</a> <br>
      <!-- <a href="#" class="card-link">Comments</a> -->
    </div>
    <div v-if="showmyarticle">
      <button type="button" class="btn btn-outline-danger" @click="editArticle(article)">Edit</button>
      <button type="button" class="btn btn-outline-danger" @click="deleteArticle(article)">Delete</button>
      <button type="button" class="btn btn-outline-danger">Share</button>
    </div>
    <div class= "card-body">
    <a href="#" class="badge badge-danger" v-for="tag in article.tags" @click.prevent="searchByTag(tag)">{{tag}}</a>
    </div>
    <div class="card-footer text-muted">
      <p>{{getDate(article.created_at)}}</p>
    </div>
    </div>
  `
})


/*  */