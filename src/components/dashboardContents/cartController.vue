<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <v-layout row wrap style="margin:10px">
                    <v-flex class="text-left">
                        <v-icon size="90" color="blue accent-3">mdi-cart</v-icon>
                    </v-flex>
                    <v-flex class="text-right mr-4">
                        <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                         <h1> CART </h1>
                        <div v-if = "this.currentRole == 'user'" >
                        <v-btn depressed dark rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="add()">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            ADD ITEM
                        </v-btn>
                        </div>
                        <v-btn v-if = "this.currentRole == 'user' || this.currentRole =='admin'" depressed dark rounded style="text-transform: none !important; margin-right:5px; margin-top:5px" color="blue accent-3"
                            @click="getService()">
                            <v-icon size="18" class="mr-2">mdi-wrench</v-icon>
                            SERVICE CART
                        </v-btn>
                        <v-btn v-if = "this.currentRole == 'user' || this.currentRole =='admin'" depressed dark rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="getKendaraan()">
                            <v-icon size="18" class="mr-2">mdi-rocket</v-icon>
                            VEHICLE CART
                        </v-btn>
                    </v-flex>
                </v-layout>
                <div>
                <v-data-table v-if = "cartKendaraan"   :headers="headersKendaraan" :items="cartKend" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.username }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.merk}}</td>
                                <td>{{ item.am }}</td>
                                <td>{{ item.harga }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
                <v-data-table v-if = "cartService"   :headers="headersService" :items="cartServ" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td >{{ item.username }}</td>
                                <td>{{ item.jenis }}</td>
                                <td>{{ item.lama}}</td>
                                <td>{{ item.harga }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
                </div>
            </v-container>
        </v-card>
        <div>
            <v-btn v-if = "this.currentRole =='admin'" depressed dark rounded style="text-transform: none !important; margin-right:5px; margin-top:5px" color="blue accent-3" 
                :href=" $apiUrl + '/laporanpdf/report'">
                <v-icon size="18" class="mr-2">mdi-printer</v-icon>
                REPORT
            </v-btn>
        </div>
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
             headersKendaraan: [{
                     text: 'No',
                     value: 'no',
                 },
                 {
                     text: 'Username',
                     value: 'username'
                 },
                 {
                     text: 'Name',
                     value: 'nama'
                 },
                 {
                     text: 'Brand',
                     value: 'merk'
                 },
                 {
                     text: 'A/M',
                     value: 'am'
                 },
                 {
                     text: 'Price',
                     value: 'am'
                 }
             ],
             headersService: [{
                     text: 'No',
                     value: 'no',
                 },
                 {
                     text: 'Username',
                     value: 'username'
                 },
                 {
                     text: 'Service Type',
                     value: 'jenis'
                 },
                 {
                     text: 'Duration',
                     value: 'lama'
                 },
                 {
                     text: 'Price',
                     value: 'harga'
                 }
             ],
             currentRole:'',
             cartKend: [],
             cartServ: [],
             cartService: '',
             cartKendaraan : '',
             user: [],
             snackbar: false,
             color: null,
             text: '',
             load: false,
             form: {
                 nama: '',
                 merk: '',
                 am: '',
                 harga:''
             },
             cartServs: new FormData,
             cartKends: new FormData,
             typeInput: 'new',
             errors: '',
             updatedId: '',
         }
     },
     methods: {
         add(){
             this.$session.set( 'username', this.$session.get('username'));
             console.log(this.$session.get('username'));
             this.$router.push('/mobil');
         },
         getService(){
             this.cartService = !this.cartService;
             if(this.cartKendaraan == true){
                 this.cartKendaraan = !this.cartKendaraan;
             }
             if(this.cartService == true){
                 if( this.currentRole == 'admin' ){
                    console.log(this.cartServ);
                    var uri = this.$apiUrl + '/cartserv'
                    this.$http.get(uri).then(response => {
                        if(response.data.error == true ){
                            console.log(response.data.error);
                            this.snackbar = true; //mengaktifkan snackbar
                            this.color = 'red'; //memberi warna snackbar
                            this.text = 'Not Found'; //memasukkan pesan ke snackbar
                            this.load = false;
                            
                        }
                        else{
                            console.log(response.data.error);
                            this.snackbar = true; //mengaktifkan snackbar
                            this.color = 'green'; //memberi warna snackbar
                            this.text = 'SUCCESS'; //memasukkan pesan ke snackbar
                            this.cartServ = response.data.message;
                            this.load = false;
                        }
                    })
                }
                else{
                    var uri = this.$apiUrl + '/servByUser/' + this.$session.get('username');
                    console.log('uri else serv',uri)
                    this.$http.get(uri).then(response => {
                        if(response.data.error == true ){
                            console.log(response.data.error);
                            this.snackbar = true; //mengaktifkan snackbar
                            this.color = 'red'; //memberi warna snackbar
                            this.text = 'Not Found'; //memasukkan pesan ke snackbar
                            this.load = false;
                            console.log(this.cartKend);
                            console.log('cba',this.$session.get('username'));
                        }
                        else{
                            
                            console.log(response.data.error);
                            this.cartServ = response.data.message;
                            this.snackbar = true; //mengaktifkan snackbar
                            this.color = 'green'; //memberi warna snackbar
                            this.text = 'SUCCESS'; //memasukkan pesan ke snackbar
                            this.load = false;
                            
                        }
                    })
                }
             }
         },
         getKendaraan(){
             this.cartKendaraan = !this.cartKendaraan;
             if(this.cartService == true){
                 this.cartService = !this.cartService;
             }
             if(this.cartKendaraan == true){
                 if( this.currentRole == 'admin' ){
                    console.log(this.currentRole,'ini role kendaraan');
                    var uri = this.$apiUrl + '/cartkend'
                    console.log('uri kend',uri)
                    this.$http.get(uri).then(response => {
                        if(response.data.error == true ){
                            console.log(response.data.error);
                            this.snackbar = true; //mengaktifkan snackbar
                            this.color = 'red'; //memberi warna snackbar
                            this.text = 'Not Found'; //memasukkan pesan ke snackbar
                            this.load = false;
                            this.cartKend = response.data.message;
                            console.log('ccc',this.$session.get('username'))
                            console.log(this.cartKend);
                        }
                        else{
                            console.log(response.data.error);
                            this.cartKend = response.data.message;
                            this.snackbar = true; //mengaktifkan snackbar
                            this.color = 'green'; //memberi warna snackbar
                            this.text = 'SUCCESS'; //memasukkan pesan ke snackbar
                            this.load = false;
                            console.log('cba',this.$session.get('username'))
                           
                            
                        }
                    })
                }
                else{
                    var uri = this.$apiUrl + '/kendByUser/' + this.$session.get('username');
                    console.log('uri else kend',uri)
                    this.$http.get(uri).then(response => {
                        if(response.data.error == true ){
                            console.log(response.data.error);
                            this.snackbar = true; //mengaktifkan snackbar
                            this.color = 'red'; //memberi warna snackbar
                            this.text = 'Not Found'; //memasukkan pesan ke snackbar
                            this.load = false;
                            
                            console.log(this.cartKend);
                            console.log('cba',this.$session.get('username'))
                        }
                        else{
                            console.log(response.data.error);
                            this.cartKend = response.data.message;
                            this.snackbar = true; //mengaktifkan snackbar
                            this.color = 'green'; //memberi warna snackbar
                            this.text = 'SUCCESS'; //memasukkan pesan ke snackbar
                            this.load = false;
                          
                        }
                    })
                }
             }
         },
         getReport(){
           var uri =  this.$apiUrl + '/laporanpdf/report';  // + this.$session.get('username');
           this.$http.get(uri).then(response => {
                
             })
         },
       
         getAccInfo() {
             var uri = this.$apiUrl + '/login/' + this.$session.get('username')
             this.$http.get(uri).then(response => {
                 this.user = response.data.message;
                 this.currentRole = this.user[0].role;
                 console.log(this.$session.get('username'));
                  console.log(this.currentRole);
             })
         },
         sendData() {
             this.cartKends.append('nama', this.form.name);
             this.cartKends.append('merk', this.form.email);
             this.cartKends.append('am', this.form.password);
             this.cartKends.append('am', this.form.password);
             var uri = this.$apiUrl + '/cartkend'
             this.load = true
             this.$http.post(uri, this.user).then(response => {
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
             this.user.append('name', this.form.name);
             this.user.append('email', this.form.email);
             this.user.append('password', this.form.password);
             var uri = this.$apiUrl + '/user/' + this.updatedId;
             this.load = true
             this.$http.post(uri, this.user).then(response => {
                 this.snackbar = true; //mengaktifkan snackbar
                 this.color = 'green'; //memberi warna snackbar
                 this.text = response.data.message; //memasukkan pesan ke snackbar
                 this.load = false;
                 this.dialog = false
                 this.getData(); //mengambil data user
                 this.resetForm();
                 this.typeInput = 'new';
             }).catch(error => {
                 this.errors = error
                 this.snackbar = true;
                 this.text = 'Try Again';
                 this.color = 'red';
                 this.load = false;
                 this.typeInput = 'new';
             })
         },
         editHandler(item) {
             this.typeInput = 'edit';
             this.dialog = true;
             this.form.name = item.name;
             this.form.email = item.email;
             this.form.password = '',
                 this.updatedId = item.id
         },
         deleteData(deleteId) { //mengahapus data
             var uri = this.$apiUrl +
                 '/user/' + deleteId; //data dihapus berdasarkan id
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
                 nama: '',
                 merk: '',
                 am: '',
                 harga: ''
             }
         }
     },
     mounted() {
         this.getAccInfo();
     },
 }
</script>