Vue.component('form-article', {
  props: ['editarticle', 'article'],
  mounted() {
    if (this.editarticle._id) {
      this.editStatus = true
      this.title = this.editarticle.title
      this.description = this.editarticle.description
      this.content = this.editarticle.content
      this.imageUrl = this.editarticle.feature_image
      this.tags = this.editarticle.tags.join(' ')
    }

  },
  data() {
    return {
      editStatus: false,
      title: '',
      description: '',
      content: '',
      tags: '',
      files: '',
      imageUrl: '',
      counter: 0,
      max: 100,
      start: ''
    }
  },
  methods: {
    addArticle() {
      this.start = true
      let formData = new FormData()
      formData.append('image', this.files[0])
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('content', this.content)
      formData.append('tags', this.tags)
      this.counter = 50
      axios({
          method: 'post',
          url: `${serverUrl}/articles`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: formData
        })
        .then(({data}) => {
          this.counter = 100
          this.$emit('new-story', data)
          swal("Congratulation", "Your article is now on top!", "success")
        })
        .catch(err => {
          console.log(err)
          swal("Sorry", "We cannot publish your article yet", "danger")
        })
    },
    previewFiles() {
      this.files = this.$refs.myFiles.files
      this.imageUrl = URL.createObjectURL(this.files[0])
    },
    edit() {
      this.start = true
      if (!this.files) {
        axios({
            method: 'patch',
            url: `${serverUrl}/articles/${this.editarticle._id}`,
            headers: {
              token: localStorage.getItem('token')
            },
            data: {
              title: this.title,
              description: this.description,
              content: this.content,
              feature_image: this.imageUrl,
              tags: this.tags.split(' ')
            }
          })
          .then(({
            data
          }) => {
            this.counter = 100
            this.$emit('edit-story', data)
            swal("Congratulation", "Your article is updated!", "success")
            console.log(data)
          })
          .catch(err => {
            console.log(err)
            swal("Sorry", "We cannot edit your article yet", "danger")
          })
      } else {
        this.counter = 25
        let formData = new FormData()
        formData.append('image', this.files[0])
        console.log(this.files[0])
          axios({ 
            method: 'post',
            url: `${serverUrl}/uploadImage`,
            headers: {
              token: localStorage.getItem('token')
            },
            data: formData
          })
          .then(({data}) => {
            console.log(data)
            this.counter = 50
            return axios({
              method: 'patch',
              url: `${serverUrl}/articles/${this.editarticle._id}`,
              headers: {
                token: localStorage.getItem('token')
              },
              data: {
                title: this.title,
                description: this.description,
                content: this.content,
                feature_image: data.imageUrl,
                tags: this.tags.split(' ')
              }
            })
          })
          .then(({
            data
          }) => {
            this.counter = 100
            this.$emit('edit-story', data)
            console.log(data)
            swal("Congratulation", "Your article is updated!", "success")
          })
          .catch(err => {
            console.log(err)
            swal("Sorry", "We cannot update your article yet", "danger")
          })
      }
    },
    cancel() {
      this.$emit('cancel-edit', true)
    }
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  template: `
  <div class="card container">
    <div class="card-body flex-wrap">
      <form method="POST" v-on:submit.prevent="addArticle()">
        <div class="row">
          <div class ="col">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" placeholder="Title" v-model="title">
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input type="text" class="form-control" id="description" placeholder="Description" v-model="description">
          </div>
          <div class="form-group">
            <label for="tags">Tags</label>
            <input type="text" class="form-control" id="tags" placeholder="tags" v-model="tags">
          </div>
          <div class="form-group">
          <label for="customFile">Headline Image</label>
          <div class="custom-file">
            <input type="file" ref="myFiles" class="custom-file-input" id="customFile" @change="previewFiles" multiple>
            <label class="custom-file-label" for="customFile">Choose file</label>
          </div>
          </div>
        </div>
        <div class="col">
        <img :src="imageUrl" alt="..." v-if="imageUrl" style="width : 100%">
        </div>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <wysiwyg type="text" v-model="content" id="content"/>
      </div>
      <b-progress :value="counter" :max="max" show-progress animated  v-if="start" />
      <button v-if="!editStatus" type="submit" class="btn btn-secondary">Publish</button>
      <button v-if="editStatus" type="button" class="btn btn-secondary" @click="edit">Edit</button>
      <button v-if="editStatus" type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
      </form>
    </div>
  </div>
  `
})