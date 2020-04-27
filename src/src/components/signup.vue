<template>
<div> 
<v-container mb-4 style="width:500px;height:500px">
    <v-alert v-model="alert"
        :color="color" 
        :elevation="2"
        :timeout="3000"
        border="left"
        :type="type"
        @click="alert = false"
        style="margin-top:-2%">
        {{ text }}
       </v-alert>
        <v-card pa-2>
                <v-responsive>
                    <v-img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60">
                    </v-img>
                </v-responsive>
            <v-container  grid-list-md style="margin-left:8%" >
                    <v-flex class="text-center lg10">
                        <h1>SIGN UP PAGE</h1>
                        <v-text-field outlined label="Username" v-model="user.username"></v-text-field>
                        <v-text-field outlined label="Email" v-model="user.email"></v-text-field>
                        <v-text-field outlined label="Password" type="password" v-model="user.password"></v-text-field>
                        <v-text-field outlined label="Phone Number" v-model="user.noTelp"></v-text-field>
                        <v-btn depressed dark color="blue accent-3" @click="sendData()">
                            SIGN UP
                        </v-btn>
                        <br>
                        <div>
                        <v-card-text>Already have an account? <v-btn color="transparent" elevation="0" to="/" style="margin-left:2%" >LOG IN</v-btn></v-card-text>
                        </div>
                        
                    </v-flex>
            </v-container>
            <v-card-actions class="blue accent-3">
                <v-icon color="white">
                    mdi-copyright
                </v-icon>
                <div class="white--text overline" style="margin-left:1%"> PAW TUBES KELOMPOK 3</div>
                <v-spacer></v-spacer>
                <v-icon color="white">
                    mdi-email
                </v-icon>
                <div class="white--text overline" style="margin-left:1%"> pawtomative@email.com </div>
            </v-card-actions>
        </v-card>
    </v-container>
</div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
         return {
             load: false,
             user: {
                 email: '',
                 password:'',
                 username:'',
                 noTelp:'',
                 role:'user',
             },
             users: new FormData,
             errors: '',
             updatedId: '',
             text: '',
             color: null,
             load: false,
             type: null,
             alert: false,
         }
     },
     methods: {
        //  getData() {
        //      var uri = this.$apiUrl + '/login'
        //      this.$http.get(uri).then(response => {
        //          this.login = response.data.message
        //      })
        //  },
         sendData() {
             if (this.user.username == '' || this.user.password == '' ||
                    this.user.email == '' || this.user.noTelp == '') {
                        this.type = "error";
                       this.alert = true;
                        this.text = "Fields must be filled!";
                        }
            else{
              this.users.append('username',this.user.username);
              this.users.append('email', this.user.email);
              this.users.append('password', this.user.password);
              this.users.append('noTelp', this.user.noTelp);
              this.users.append('role', this.user.role);
              var uri = this.$apiUrl + '/user';
              this.$http.post(uri, this.users).then(response => {
                      this.alert = true; //mengaktifkan snackbar
                       //memberi warna snackbar
                      this.text = 'Please Check Your Email';
                      this.type = "success" //memasukkan pesan ke snackbar
                      this.load = true;
                      console.log('response');
              }).catch(error => {
                    
                      this.alert = true; //mengaktifkan snackbar
                      this.type = "error" //memberi warna snackbar
                      this.text = 'Something Went Wrong'; //memasukkan pesan ke snackbar
                      this.load = true;
                      console.log('error');

              });
            }
              
         },
        //  updateData() {
        //      this.mobils.append('nama', this.form.nama);
        //      this.mobils.append('merk', this.form.merk);
        //      this.mobils.append('am', this.form.am);
        //      this.mobils.append('harga', this.form.harga);
        //      var uri = this.$apiUrl + '/mobil/' + this.updatedId;
        //      this.load = true
        //      this.$http.post(uri, this.mobils).then(response => {
        //          this.snackbar = true; //mengaktifkan snackbar
        //          this.color = 'green'; //memberi warna snackbar
        //          this.text = response.data.message; //memasukkan pesan ke snackbar
        //          this.load = false;
        //          this.dialog = false
        //          this.getData(); //mengambil data user
        //          this.resetForm();
        //          this.typeInput = 'new';
        //      }).catch(error => {
        //          this.errors = error
        //          this.snackbar = true;
        //          this.text = 'Try Again';
        //          this.color = 'red';
        //          this.load = false;
        //          this.typeInput = 'new';
        //      })
        //  },
        //  editHandler(item) {
        //      this.typeInput = 'edit';
        //      this.dialog = true;
        //      this.form.nama = item.nama;
        //      this.form.merk = item.merk;
        //      this.form.am = item.am;
        //      this.form.harga= item.harga,
        //          this.updatedId = item.id
        //  },
        //  deleteData(deleteId) { //mengahapus data
        //      var uri = this.$apiUrl +
        //          '/mobil/' + deleteId; //data dihapus berdasarkan id
        //      this.$http.delete(uri).then(response => {
        //          this.snackbar = true;
        //          this.text = response.data.message;
        //          this.color = 'green'
        //          this.deleteDialog = false;
        //          this.getData();
        //      }).catch(error => {
        //          this.errors = error
        //          this.snackbar = true;
        //          this.text = 'Try Again';
        //          this.color = 'red';
        //      })
        //  },
        //  setForm() {
        //      if (this.typeInput === 'new') {
        //          this.sendData()
        //      } else {
        //          console.log("dddd")
        //          this.updateData()
        //      }
        //  },
        //  resetForm() {
        //      this.form = {
        //          nama: '',
        //          merk: '',
        //          am: '',
        //          harga:''
        //      }
        //  }
     },
     mounted() {
     //    this.getData();
     },
    computed: {
    // filteredList() {
    //   return this.postList.filter(mobil => {
    //     return mobil.nama.toLowerCase().includes(this.search.toLowerCase())
    //   })
    // }
}
 }
</script>