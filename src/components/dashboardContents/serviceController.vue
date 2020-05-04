<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <v-layout row wrap style="margin:10px">
                    <v-flex class="text-left">
                        <v-icon size="90" color="blue accent-3">mdi-wrench</v-icon>
                    </v-flex>
                    <v-flex class="text-right mr-4">
                        <h1>SERVICE CATALOGUE</h1>
                        <v-btn v-if = "currentRole == 'admin'" depressed dark rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            ADD SERVICE
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-container class="my-5">
                    <v-layout row wrap> 
                        <v-flex xs12 sm6 md4 lg3 v-for="item in service" :key="item.id">
                        <v-card flat class="text-xs-center ma-3 elevation-5">
                            <v-responsive>
                            <v-img :src="getImgUrl(item)" height="200px"></v-img>
                            </v-responsive>
                            <v-card-text>
                            <div class="blue--text text-uppercase font-weight-bold title">{{ item.jenis }}</div>
                            <div class="blue--text text-uppercase font-weight-bold title">{{ item.lama }} </div>
                            <div class="black--text text-uppercase font-weight-bold">{{ item.deskripsi }}</div>
                            <div class="red--text text-uppercase font-weight-bold text-center body">Rp {{ item.harga }}</div>
                            </v-card-text>
                            <v-card-actions class="blue darken-3" > 
                            
                            <v-btn v-if = "currentRole == 'admin'" color="transparent elevation-0"  >
                                <v-icon class="mr-0" color="white" @click="editHandler(item)" >mdi-pencil</v-icon>
                                <div class="white--text">EDIT</div>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn v-if = "currentRole == 'admin'" color="transparent elevation-0"  >
                                <div class="white--text">DELETE</div>
                                <v-icon class="mr-0" color="white" @click="deleteData(item.id)">mdi-delete</v-icon>
                            </v-btn>
                            <v-btn v-if = "currentRole == 'user'" color="transparent elevation-0"  >
                                <v-icon class="mr-0" color="white" @click="add(item)">mdi-plus</v-icon>
                                <div class="white--text">CLICK TO ADD</div>
                            </v-btn>
                            
                            <!-- <div v-if = "role == 'user' " >
                             <v-btn color="transparent elevation-0" style="margin-left:35%">
                                <div class="white--text">ADD TO CART</div>
                                <v-icon class="mr-0" color="white" @click="addCart(item.id)">mdi-cart</v-icon>
                            </v-btn>
                            </div> -->
                            </v-card-actions>
                        </v-card>
                        </v-flex>   
                    </v-layout>
                </v-container>  
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="blue--text title" > SERVICE PROFILE </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="Service Type*" v-model="form.jenis" required>
                                    </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="Duration*" v-model="form.lama" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="Price*" v-model="form.harga"  required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="Description*" v-model="form.deskripsi"  required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="Link Img*" v-model="form.link"  required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small class="red--text font-weight-bold text-uppercase">*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="resetForm()">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
            {{ text }}
            <v-btn dark text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
import VueSession from 'vue-session'
export default {
 data() {
         return {
             dialog: false,
             keyword: '',
             service: [],
             snackbar: false,
             currentRole : '',
             color: null,
             text: '',
             load: false,
             form: {
                 jenis: '',
                 lama:'',
                 harga: '',
                 link: '',
                 deskripsi:'',

             },
             services: new FormData,
             typeInput: 'new',
             errors: '',
             updatedId: '',
         }
     },
     methods: {
         getData() {
             var uri = this.$apiUrl + '/service'
             this.$http.get(uri).then(response => {
                 this.service = response.data.message
             })
         },
         getAccInfo(){
             var uri = this.$apiUrl + '/login/' + this.$session.get('username')
             this.$http.get(uri).then(response => {
                 this.user = response.data.message;
                 this.currentRole = this.user[0].role;
                 console.log(this.$session.get('username'));
                  console.log(this.currentRole);
             })
         },
         sendData() {
             this.services.append('jenis', this.form.jenis);
             this.services.append('lama', this.form.lama);
             this.services.append('harga', this.form.harga);
             this.services.append('deskripsi', this.form.deskripsi);
             this.services.append('link', this.form.link);
             var uri = this.$apiUrl + '/service'
             this.load = true
             this.$http.post(uri, this.services).then(response => {
                 this.snackbar = true; //mengaktifkan snackbar
                 this.color = 'green'; //memberi warna snackbar
                 this.text = response.data.message; //memasukkan pesan ke snackbar
                 this.load = false;
                 this.dialog = false
                 this.getData(); //mengambil data user
                 this.resetForm();
             }).catch(error => {
                 this.errors = error
                 this.snackbar = true;
                 this.text = 'Try Again';
                 this.color = 'red';
                 this.load = false;
             })
         },
         add(service){
             this.services.append('jenis', service.jenis);
             this.services.append('lama', service.lama);
             this.services.append('harga', service.harga);
             this.services.append('username', this.$session.get('username'));
             console.log(this.services);
             console.log(this.service);
             var uri = this.$apiUrl + '/cartserv'
             console.log(uri)
             this.load = true
             this.$http.post(uri, this.services).then(response => {
                 this.snackbar = true; //mengaktifkan snackbar
                 this.color = 'green'; //memberi warna snackbar
                 this.text = response.data.message; //memasukkan pesan ke snackbar
                 this.load = false;
                 this.dialog = false
                 this.getData(); //mengambil data user
                 this.resetForm();
             }).catch(error => {
                 this.errors = error
                 this.snackbar = true;
                 this.text = 'Try Again';
                 this.color = 'red';
                 this.load = false;
             })
         },
         updateData() {
             this.services.append('jenis', this.form.jenis);
             this.services.append('lama', this.form.lama);
             this.services.append('harga', this.form.harga);
             this.services.append('deskripsi', this.form.merk);
             this.services.append('link', this.form.link);
             var uri = this.$apiUrl + '/service'
             this.load = true
             this.$http.post(uri, this.services).then(response => {
                 this.snackbar = true; //mengaktifkan snackbar
                 this.color = 'green'; //memberi warna snackbar
                 this.text = response.data.message; //memasukkan pesan ke snackbar
                 this.load = false;
                 this.dialog = false
                 this.getData(); //mengambil data user
                 this.resetForm();
             }).catch(error => {
                 this.errors = error
                 this.snackbar = true;
                 this.text = 'Try Again';
                 this.color = 'red';
                 this.load = false;
             })
         },
         editHandler(item) {
             this.typeInput = 'edit';
             this.dialog = true;
             this.form.jenis = item.jenis;
             this.form.lama = item.lama;
             this.form.harga = item.harga;
             this.form.deskripsi= item.deskripsi,
             this.form.link = item.link
                 this.updatedId = item.id
         },
         deleteData(deleteId) { //mengahapus data
             var uri = this.$apiUrl +
                 '/service/' + deleteId; //data dihapus berdasarkan id
             this.$http.delete(uri).then(response => {
                 this.snackbar = true;
                 this.text = response.data.message;
                 this.color = 'green'
                 this.deleteDialog = false;
                 this.getData();
             }).catch(error => {
                 this.errors = error
                 this.snackbar = true;
                 this.text = 'Try Again';
                 this.color = 'red';
             })
         },
         setForm() {
             if (this.typeInput === 'new') {
                 this.sendData()
             } else {
                 console.log("dddd")
                 this.updateData()
             }
         },
         resetForm() {
             this.form = {
                 jenis: '',
                 lama: '',
                 harga: '',
                 deskripsi:'',
                 link:''
             }
             this.dialog = false
         },
         getImgUrl(item) {
             var image = item.link
             return item.link
         }
     },
     mounted() {
         this.getAccInfo();
         this.getData();
     },
    computed: {
    
    }
 }
</script>