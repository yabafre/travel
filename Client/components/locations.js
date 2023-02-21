import { API_URL } from "./../config.js";

export default {
    template: `
        <div class="panel-group">
          <div class="panel panel-default">
            <div class="panel-heading mb-5">
              <h4>List Location / City </h4>
              <button type="button" class="btn btn-dark" @click="displayForm">Add location</button>
            </div>
            <div class="panel-body">
              <div class="list-group list-group-horizontal row row-cols-1 justify-content-center">
                <div class="card border-primary mb-3 modal" style="max-width: 25rem;" v-for="location in locations" :key="location.id">
                    <div class="card-header h1">{{ location.name }}</div>
                    <div class="card-body">
                      <h4 class="card-title h5 mb-3">Places : <span class="badge bg-primary rounded-pill">{{ location.place.length}}</span></h4>
                      <div class="embed-responsive embed-responsive-4by3">
                        <iframe style="width: 100%" class="embed-responsive-item" :src="'https://maps.google.com/maps?q=' + location.lat + ',' + location.lng + '&hl=es;z=13&amp;output=embed'"></iframe>
                      </div>
                        <p class="card-text flex-column justify-content-center">
                        <router-link :to="{ name: 'LocationDetails', params: { slug: location.slug, locationId: parseInt(location.id) }}"><button class="btn btn-info">Voir plus</button></router-link>
                        <button class="btn btn-secondary" @click="deleteLocation(location)">Supprimer</button>
                      </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="location-form-container">
            <div class="panel panel-default location-form">
              <div class="modal modal-md">
                <div class="modal-dialog modal-md" role="document">
                  <div class="modal-content">
                      <form @submit.prevent="createLocation" >
                        <div class="modal-header">
                          <h5 class="modal-title">New Location</h5>
                        </div>
                        <div class="modal-body">
                        <fieldset>
                          <div class="form-group row">
                            <label class="form-label mt-4">Nom</label>
                            <div class="col-sm-12">
                              <input class="form-control" type="text" v-model="newLocation.name">
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="form-label mt-4">lat</label>
                            <input class="form-control" type="number" step="0.00000001" v-model="newLocation.lat">
                          </div>
                          <div class="form-group">
                            <label class="form-label mt-4">lng</label>
                            <input class="form-control" type="number" step="0.00000001" v-model="newLocation.lng">
                          </div>
                        </fieldset>
                        </div>
                        <div class="modal-footer">
                          <button type="submit" class="btn btn-primary">add new location</button>
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
            locations: [],
            newLocation: {
                name:'',
                lat: '',
                lng: '',
            }
        }
    },
    mounted() {
        this.fetchLocations();
    },
    methods: {
        fetchLocations() {
            fetch(`${API_URL}/locations`, { method: "GET" })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    this.locations = json;
                })
                .catch(error => {
                    console.error('Une erreur est survenue:', error);
                });
        },
        createLocation() {
            fetch(`${API_URL}/locations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.newLocation)
            })
                .then(response => {
                        return response.json()
                })
                .then (data => {
                    console.log(data)
                    this.newLocation.name = '';
                    this.newLocation.lat = '';
                    this.newLocation.lng = '';
                    this.fetchLocations();
                })
                .catch(error => {
                    console.error('Une erreur est survenue:', error);
                });
        },
        deleteLocation(location) {
            console.log(location.place.length)
            if(location.place.length <= 0) {
                if (confirm(`Supprimer ${location.name} ?`)) {
                    fetch(`${API_URL}/locations/${location.id}`, {
                        method: 'DELETE'
                    })
                        .then(response => {
                            console.log(response)
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error('Error deleting location');
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
            } else {
                alert('veuillez supprimer les lieux visités avant tout !');
            }
        },
        displayForm(){
            let form = document.querySelector('.location-form-container');
            form.classList.toggle('active');
        }
    }
};
