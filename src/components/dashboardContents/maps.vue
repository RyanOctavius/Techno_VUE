<template>
<GmapMap
  :center="{lat:-7.741700, lng:110.410250}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 1500px; height: 2000px; margin-top:-7%"
  :options="{
   zoomControl: true,
   mapTypeControl: true,
   scaleControl: true,
   streetViewControl: true,
   rotateControl: true,
   fullscreenControl: true,
   disableDefaultUi: false
 }">
  <gmap-custom-marker :marker="marker"></gmap-custom-marker>
 </GmapMap>
</template>
<script>

import VueSession from 'vue-session'
export default {
    name:"my-map",
 data() {
         return {
             marker: {
                lat: 50.60229509638775,
                lng: 3.0247059387528408
            }
         }
     },
     methods: {

     },
     mounted() {
     },
 }
</script>