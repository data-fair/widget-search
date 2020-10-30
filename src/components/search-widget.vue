<template>
  <div class="df-search-files">
    <v-menu v-model="menu" offset-y rounded="lg" :nudge-bottom="8" max-width="500" max-height="450" attach :elevation="0" :dark="dark">
      <template v-slot:activator="{}">
        <v-text-field
          autocomplete="off"
          name="search"
          v-model="search"
          @input="input" @click="click"
          placeholder="Rechercher"
          hide-details
          append-icon="mdi-magnify"
          outlined
          :solo="focused"
          :filled="!focused"
          dense
          rounded
          style="min-width:150px;"
          @focus="focus"
          @blur="blur"
          class="pa-1"
          />
      </template>
      <v-progress-linear v-if="loading" absolute indeterminate></v-progress-linear>
      <v-list v-if="lines && lines.length" class="py-0">
        <v-list-item v-for="line in lines" :key="line._id" :two-line="line.highlight.length > 100" :three-line="line.highlight.length > 200" :href="line.url">
          <v-list-item-avatar v-if="imageField">
            <v-img :src="line.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="primary--text">
              {{ line.title }}
              &nbsp;
              <template v-if="line.tags">
                <v-chip v-for="tag in line.tags" :key="tag" x-small label color="primary" class="ml-2">{{tag}}</v-chip>
              </template>
            </v-list-item-title>
            <v-list-item-subtitle v-if="line.highlight" v-html="line.highlight" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="justify-center" dense @click.stop="input(search, 20)" v-if="size === 5 && count > 5">
          <span class="primary--text subtitle-2">
            Voir plus de résultats
          </span>
        </v-list-item>
      </v-list>
      <v-list v-else-if="lines" class="py-0">
        <v-list-item>
          Aucun résultat
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'SearchWidget',
  props: {
    'dfUrl': String,
    'datasetId': String,
    'textKey': String,
    'dark': Boolean
  },
  data: () => ({
    menu: false,
    focused: false,
    loading: false,
    search: '',
    lines: null,
    count: null,
    schema: null,
    size: 5,
  }),
  computed: {
    pathField() {
      if (!this.schema) return
      const prop = this.schema.find(p => p['x-refersTo'] === 'http://schema.org/DigitalDocument')
      return prop && prop.key
    },
    urlField() {
      if (!this.schema) return
      const prop = this.schema.find(p => p['x-refersTo'] === 'https://schema.org/WebPage') || this.schema.find(p => p['x-refersTo'] === 'http://schema.org/image')
      return prop && prop.key
    },
    titleField() {
      if (!this.schema) return
      const prop =  this.schema.find(p => p['x-refersTo'] === 'http://www.w3.org/2000/01/rdf-schema#label')
      return prop ? prop.key : '_id'
    },
    textField() {
      if (!this.schema) return
      let prop
      if (this.textKey) {
        prop =  this.schema.find(p => p.key === this.textKey)
      } else if (this.pathField) {
        prop =  this.schema.find(p => p.key === '_file.content')
      } else {
        prop =  this.schema.find(p => p['x-refersTo'] === 'http://schema.org/description')
      }
      return prop && prop.key
    },
    imageField() {
      if (!this.schema) return
      const prop = this.schema.find(p => p['x-refersTo'] === 'http://schema.org/image')
      return prop && prop.key
    },
    tagsField() {
      if (!this.schema) return
      const prop = this.schema.find(p => p['x-refersTo'] === 'https://schema.org/DefinedTermSet')
      return prop && prop.key
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.schemaPromise = this.$axios.get(`${this.dfUrl}/api/v1/datasets/${this.datasetId}/schema`)
        .then(res => {this.schema = res.data})
    },
    async input(search, size=5) {
      this.size = size
      await this.schemaPromise
      if (search.length) {
        this.menu = true
        const params = {q: search, size}
        if (this.textField) params.highlight = this.textField
        params.select = this.titleField
        if (this.urlField) params.select += ',' + this.urlField
        if (this.imageField) params.select += ',' + this.imageField
        if (this.tagsField) params.select += ',' + this.tagsField
        this.loading = true
        const res = (await this.$axios.get(`${this.dfUrl}/api/v1/datasets/${this.datasetId}/lines`, {params})).data
        this.loading = false
        this.count = res.total
        this.lines = res.results.map(result => ({
          _id: result._id,
          title: result[this.titleField],
          url: this.urlField && result[this.urlField],
          image: this.imageField && result[this.imageField],
          highlight: this.textField && result._highlight[this.textField].join('... '),
          tags: this.tagsField && result[this.tagsField] ? result[this.tagsField].split(',') : []
        }))
      } else {
        this.menu = false
      }
    },
    click() {
      if (this.search.length) {
        this.menu = true
      }
    },
    focus() {
      this.focused = true
    },
    blur() {
      this.focused = false
    }
  }
}
</script>

<style>
.df-search-files em.highlighted {
  color: #1e88e5;
}
</style>
