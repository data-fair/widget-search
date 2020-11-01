<template>
  <v-app
    style="width: auto;height: auto;background-color: transparent;"
    class="df-search-files-app"
    :dark="dark"
  >
    <search-widget
      :df-url="dfUrl"
      :dataset-id="datasetId"
    />
  </v-app>
</template>

<script>
  import SearchWidget from './components/search-widget'

  export default {
    name: 'App',
    components: {
      SearchWidget,
    },
    props: {
      dfUrl: String,
      datasetId: String,
      dark: Boolean,
    },
  }
</script>

<style>
.df-search-files-app .v-application--wrap {
  height: auto;
  min-height: 0;
}
</style>
