<template>
    <textarea v-model="address"
    class="peer block min-h-[auto] w-full rounded-sm border border-gray-300 mb-2 px-3 py-[0.32rem] focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
    rows="3"
    placeholder="Enter Address"></textarea>
    <div ref="map" class="map-container"></div>
</template>
  
<script setup>
    import mapboxgl from 'mapbox-gl'; 
    // import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    import { ref , onMounted, defineEmits, watch, defineProps} from 'vue';
    
    const map = ref(null);
    const address = ref('');
    
    onMounted(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaHRldHphd3BoeW8iLCJhIjoiY2xyZGp5amk3MThqZDJrbWt0M3NtZHZzayJ9.Gh0uF3LNj5eEs92tFnVHKQ';
    
        map.value = new mapboxgl.Map({
            container: map.value,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [96.1561, 16.8661],
            zoom: 9,
            attributionControl: false
        });

        // Add Mapbox Geocoder control
        // const geocoder = new MapboxGeocoder({
        //     accessToken: mapboxgl.accessToken,
        //     mapboxgl: mapboxgl,
        // });

        // map.value.addControl(geocoder);
    
        // Add a click event listener to the map
        map.value.on('click', handleMapClick);
    })

    const handleMapClick = async(event) => {
        const { lng, lat } = event.lngLat;
  
        // Use Mapbox Geocoding API to get the location address
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
        );

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.features.length > 0) {
                const locationAddress = responseData.features[0].place_name;
                address.value = locationAddress;
            }
        }
    };

    const emit = defineEmits(['emit-address']); 
    const props = defineProps(['hasAddress']);
    address.value = props.hasAddress;
    watch(address, () => {    
        emit('setAddress', address.value);
    })
</script>
  
<style scoped>
    .map-container {
        height: 500px;
    }
</style>