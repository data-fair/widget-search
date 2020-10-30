<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h2>Simple example: searching in vjsf documentation</h2>
            <div style="width: 200px;" class="ma-4">
              <search-widget df-url="http://localhost:5600" dataset-id="web-crawler-dev"/>
            </div>

            <h2>Same as previous example but dark </h2>
            <div style="width: 200px;" class="ma-4">
              <search-widget df-url="http://localhost:5600" dataset-id="web-crawler-dev" dark/>
            </div>

            <h2>Example with image: searching in icons</h2>
            <div style="width: 200px;" class="ma-4">
              <search-widget df-url="https://koumoul.com/s/data-fair" dataset-id="icons-mdi-latest" text-key="aliases"/>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SearchWidget from './components/search-widget';

export default {
  name: 'App',

  components: {
    SearchWidget,
  },

  data: () => ({
    //
  }),
};
</script>
