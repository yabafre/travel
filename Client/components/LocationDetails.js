import { API_URL } from "./../config.js";
export default {
    props: {
        locationId: {
            type: Number,
            required: true
        },
    },
    template: `
      <div class="panel-group">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Places of {{places.name}}</h4>
              <button type="button" class="btn btn-dark" @click="displayForm">Add place</button>
            </div>
            <div class="panel-body">
              <div class="list-group list-group-horizontal row row-cols-3 justify-content-center">
                <div class="modal mb-3" style="max-width: 25rem;" v-for="place in places.place" :key="place.id">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">{{place.name}}</h5>
                      </div>
                      <div class="modal-body">
                      <p>Latitude : <span class="text-warning"> {{place.lat}}</span>, &ensp; Longitude : <span class="text-warning">{{place.lng}}</span>, &ensp;Visitée: <span class="text-warning">{{place.visited ? 'Oui' : 'Non'}}</span> </p>
                      <div class="embed-responsive embed-responsive-4by3">  
                        <iframe style="width: 100%" :src="'https://maps.google.com/maps?q=' + place.lat + ',' + place.lng + '&hl=es;z=14&amp;output=embed'"></iframe>
                      </div>
                        <div v-if="place.showForm">
                          <form @submit.prevent="updatePlace(place)">
                          <fieldset>
                            <div class="form-group mb-3">
                              <label>Name :</label>
                              <input type="text" v-model="place.name" required>
                            </div>
                            <div class="form-group mb-3">
                              <label>lat : </label>
                              <input type="number" step="0.00000001" v-model="place.lat" required>
                            </div>
                            <div class="form-group mb-3">
                              <label>lng : </label>
                              <input type="number" step="0.00000001" v-model="place.lng" required>
                            </div>
                            <div class="form-group mb-3 form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="place.visited" :checked="parseInt(place.visited) === 1">
                                <label class="form-check-label" for="flexSwitchCheckChecked">Checked :</label>
                            </div>
                              <button class="btn btn-outline-success" type="submit">Save</button>
                            </fieldset>
                        </form>
                        </div>
                    </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="place.showForm = !place.showForm">Modifier</button>
                        <button type="button" class="btn btn-secondary" @click="deletePlace(place)">Supprimer</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="place-form-container">
            <div class="panel panel-default place-form">
              <div class="modal modal-md">
                <div class="modal-dialog modal-md" role="document">
                  <div class="modal-content">
                    <form @submit.prevent="createPlace">
                        <div class="modal-header">
                          <h5 class="modal-title">New Place</h5>
                        </div>
                        <div class="modal-body">
                          <fieldset>
                            <div class="form-group row">
                              <label class="form-label mt-4">Nom</label>
                              <div class="col-sm-12">
                                <input class="form-control" type="text" v-model="newPlaces.name" required>
                              </div>
                            </div>
                            <div class="form-group">
                              <label class="form-label mt-4">lat</label>
                              <input class="form-control" type="number" step="0.00000001" v-model="newPlaces.lat" required>
                            </div>
                            <div class="form-group">
                            <label class="form-label mt-4">lng</label>
                              <input class="form-control" type="number" step="0.00000001" v-model="newPlaces.lng" required>
                            </div>
                            <div class="-form-group form-check form-switch">
                              <label class="form-check-label form-label mt-4" for="flexSwitchCheckChecked">Visited : </label>
                              <input class="form-control form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="newPlaces.visited">
                            </div>
                          </fieldset>
                        </div>
                        <div class="modal-footer">
                          <button type="submit" class="btn btn-primary">add new place</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="displayForm">Close</button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
              </div>
          </div>
          <div class="message-alert"></div>
      </div>
    `,
    data() {
        return {
            places: [
            ],
            newPlaces: {
                name:'',
                lat: '',
                lng: '',
                visited: null,
            }
        };
    },
    mounted() {
        this.loadPlaces();
        // setInterval(this.loadPlaces, 5000);
    },
    methods: {
        loadPlaces() {
            fetch(`${API_URL}/locations/${this.locationId}`, { method: "GET" })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    this.places = json;
                })
                .catch(error => {
                    console.error('Une erreur est survenue:', error);
                });
        },
        deletePlace(place) {
            if (confirm(`Supprimer ${place.name} ?`)){
                fetch(`${API_URL}/places/${place.id}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        console.log(response)
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Error deleting place');
                        }
                    })
                    .then(data => {
                        let message = document.querySelector('.message-alert');
                        message.innerHTML = `
                    <div class="alert alert-dismissible alert-success">
                      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                      <strong>Well done!</strong> ${data}.
                    </div>
                    `;
                        console.log(data);
                        this.loadPlaces();
                    })
                    .catch(error => {
                        console.error(error);
                        let message = document.querySelector('.message-alert');
                        message.innerHTML = `
                            <div class="alert alert-dismissible alert-danger">
                              <strong>Oh snap!</strong> ${error}
                            </div>
                        `;
                        setTimeout(() => {
                            message.innerHTML = '';
                        }, 10000);
                    });
            }
        },
        createPlace() {
            console.log(this.newPlaces);
            let form = document.querySelector('.place-form-container');
            form.classList.remove('active');
            fetch(`${API_URL}/locations/${this.locationId}/places`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.newPlaces)
            })
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(data => {
                    let message = document.querySelector('.message-alert');
                    if(data.message === 'success'){
                        message.innerHTML = `
                            <div class="alert alert-dismissible alert-success">
                              <strong>Well done!</strong> success create Place.
                            </div>
                        `;
                        setTimeout(() => {
                            message.innerHTML = '';
                        }, 5000);
                    } else {
                        let message = document.querySelector('.message-alert');
                        message.innerHTML = `
                            <div class="alert alert-dismissible alert-danger">
                              <strong>Oh snap!</strong> ${data.name || data.lat || data.lng || data.visited}
                            </div>
                        `;
                        setTimeout(() => {
                            message.innerHTML = '';
                        }, 10000);
                    }
                    console.log(data);
                    this.loadPlaces();
                })
        },
        updatePlace(place) {
            place.showForm = false;
            console.log(place);
            fetch(`${API_URL}/places/${place.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(place)
            })
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(data => {
                    let message = document.querySelector('.message-alert');
                    if(data.message === 'success'){
                        message.innerHTML = `
                            <div class="alert alert-dismissible alert-success">
                              <strong>Well done!</strong> success update Place.
                            </div>
                        `;
                        setTimeout(() => {
                            message.innerHTML = '';
                        }, 5000);
                    } else {
                        let message = document.querySelector('.message-alert');
                        message.innerHTML = `
                            <div class="alert alert-dismissible alert-danger">
                              <strong>Oh snap!</strong> ${data.name || data.lat || data.lng || data.visited}
                            </div>
                        `;
                        setTimeout(() => {
                            message.innerHTML = '';
                        }, 10000);
                    }
                    console.log(data);
                    this.loadPlaces();
                })

        },
        displayForm(){
            let form = document.querySelector('.place-form-container');
            form.classList.toggle('active');
        }
    }
};
