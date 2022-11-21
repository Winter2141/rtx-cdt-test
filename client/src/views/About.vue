<template>
  <div class="about">
    <!-- 8. Display the data with a structured table in following columns -->
    <!-- property.name | property.location.country | property.reviews.summary.score -->
    <!-- 9. Do a simple pagination of 5 per page-->
    <!-- 10. Hide the entry without country and/or score-->
    <div v-if="filter_hotels">
      <div>
        <el-checkbox v-model="hide_empty_country" label="Hide Empty Country" @change="filter"/>
        <el-checkbox v-model="hide_empty_score" label="Hide Empty Score" @change="filter"/>
      </div>
      <el-table :data="hotel_list[current_page-1]">
        <el-table-column prop="property.name" label="Name"/>
        <el-table-column
        prop="property.location.country"
        label="Country"/>
        <el-table-column
        prop="property.reviews.summary.score" label="Score"/>
      </el-table>
      <el-pagination v-model:current-page="current_page"  background layout="prev, pager, next" :total="filter_hotels.length" :page-size="per_page"/>
    </div>
  </div>
</template>

<script>
// import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      hotels: [],
      filter_hotels: [],
      current_page: 1,
      per_page: 5,
      hotel_list: [],
      hide_empty_country: false,
      hide_empty_score: false
    };
  },
  mounted() {
    axios.get('http://localhost:3000/api/fromSource')
      .then((res) => {
        this.hotels = res?.data?.outlets?.availability?.results;
        this.filter_hotels = this.hotels;
        this.filterPage();
      });
  },
  methods: {
    filter() {
      this.filter_hotels = this.hotels;
      if(this.hide_empty_country) {
        this.filter_hotels = this.filter_hotels.filter(hotel => {
          return hotel?.property?.location?.country !== '';
        });
      }
      if(this.hide_empty_score) {
        this.filter_hotels = this.filter_hotels.filter(hotel => hotel.property?.reviews?.summary?.score != null)
      }
      this.filterPage();
    },
    filterScore(value, row) {
      return row?.property?.reviews?.summary?.score ? true : false;
    },
    filterPage() {
      this.hotel_list = [];
      for (let i = 0; i < Math.ceil(this.filter_hotels.length / this.per_page); i++) {
          let last_index = i * this.per_page + 5;
          if(this.filter_hotels.length <= last_index) {
            last_index = this.filter_hotels.length
          }
          this.hotel_list.push(this.filter_hotels.slice(i * this.per_page, i * this.per_page + 5));
      }
    }
  },
};

</script>
