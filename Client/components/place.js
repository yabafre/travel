export default{
    template: `
     <div class="place">
        <h2>{{ place.name }}</h2>
        <p>Latitude: {{ place.lat }}</p>
        <p>Longitude: {{ place.lng }}</p>
        <p>Visitée: {{ place.visited ? 'Oui' : 'Non' }}</p>
        <button @click="editPlace">Modifier</button>
    <button @click="deletePlace">Supprimer</button>
</div>
    `,
    methods: {
        editPlace() {
            // rediriger l'utilisateur vers la page de modification de l'endroit
            this.$router.push({ name: 'place-edit', params: { placeId: this.place.id } });
        },
        deletePlace() {
            // appeler l'API pour supprimer l'endroit
            axios.delete(`/api/locations/${this.place.location_id}/places/${this.place.id}`)
                .then(response => {
                    // rediriger l'utilisateur vers la page du lieu
                    this.$router.push({ name: 'location-details', params: { locationId: this.place.location_id } });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted(){

        fetch(`${API_URL}/locations/1/places`, { method: "GET" })
            .then(response => response.json())
            .then(json => {

                console.log(json);
                this.locations = json
            })

    }
}