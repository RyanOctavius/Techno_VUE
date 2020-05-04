<template>
<div>
<v-container mb-4 style="width:500px;height:500px;margin-top:-5%">
    <v-alert v-model="alert"
        :color="color" 
        :elevation="2"
        :timeout="3000"
        border="left"
        :type="type"
        @click="alert = false">
        {{ text }}
       </v-alert>
        <v-card pa-2 v-for="item in user" :key="item.username">
                       <v-responsive>
                        <v-img style="max-height:400px" ></v-img>
                      </v-responsive>
                    <v-flex md4 class="text-center lg10" style="margin-left:8%">
                        <h1 style="margin-top:2%">PROFILE INFO</h1>
                        <v-layout row wrap class="text-left lg5">
                        <v-flex>
                                <v-flex>
                                    <v-card flat class="text-xs-center ma-3 elevation-0">
                                        <v-card-actions class="blue">
                                            <v-card-text class="white--text text-center"><v-icon color="white"> mdi-account </v-icon> USERNAME </v-card-text>
                                        </v-card-actions>
                                        <v-card-text>
                                            <div class="blue--text text-uppercase font-weight-bold text-center">
                                                {{ item.username }}
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                        </v-flex>
                        <v-flex>
                             <v-flex>
                                   <v-card flat class="text-xs-center ma-3 elevation-0">
                                        <v-card-actions class="blue">
                                            <v-card-text class="white--text text-center"><v-icon color="white"> mdi-phone </v-icon> PHONE NUMBER </v-card-text>
                                        </v-card-actions>
                                        <v-card-text>
                                            <div class="blue--text text-uppercase font-weight-bold text-center">
                                                {{ item.noTelp }}
                                            </div>
                                        </v-card-text>
                                    </v-card>
                             </v-flex>
                        </v-flex>
                        <v-flex>
                             <v-flex>
                                 <v-card flat class="text-xs-center ma-3 elevation-0">
                                        <v-card-actions class="blue">
                                            <v-card-text class="white--text text-center"><v-icon color="white"> mdi-email </v-icon> EMAIL </v-card-text>
                                        </v-card-actions>
                                        <v-card-text>
                                            <div class="blue--text text-uppercase font-weight-bold text-center">
                                                {{ item.email }}
                                            </div>
                                        </v-card-text>
                                    </v-card>
                             </v-flex>
                        </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-file-input  id="avatar" name="avatar" style="padding-left:3em; padding-right:3.2em"></v-file-input>
            <v-card-actions class="blue">
                <v-btn @click="updateData()" style="border-color:transparant" elevation="0" color="transparent">
                    <div class="white--text">EDIT ACCOUNT</div>
                    <v-icon color="white" size="30">mdi-account</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn style="border-color:transparant" elevation="0" color="transparent" >
                    <div class="white--text">UPLOAD IMAGE</div>
                    <v-icon color="white" size="30">mdi-camera</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="blue--text title" > USER PROFILE </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="New Username*" v-model="form.username" required>
                                    </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="New Email*" v-model="form.email" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="New Password*" v-model="form.password" type="password" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="New Phone Number*" v-model="form.noTelp"  required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small class="red--text font-weight-bold text-uppercase">*indicates required field</small>
                    <div class="green-text"> You will be logged out after this</div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="resetForm()">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</div>
</template>
<script>
import VueSession from 'vue-session'
export default {
    data (){
        return{
            alert: false,
            dialog: false,
            load: false,
            user:[],
            form: {
                 username: '',
                 email:'',
                 noTelp: '',
                 password: ''
             },
             users: new FormData,
             typeInput: 'new',
             errors: '',
             updatedId: '',
             updatedPassword:'',
             currentUser: '',
             currentRole:'',
             text: '',
             selectedFile:null,
             color: null,
             load: false,
             type: null,
             alert: false,
        }
    },
     methods: {
         getData() {
             if(this.$session.exists() == false){
                
             }
             else{
             var uri = this.$apiUrl + '/user/' + this.$session.get('username')
             this.$http.get(uri).then(response => {

                 this.user = response.data.data
                 this.currentUser = this.$session.get('username')
                 console.log(this.currentUser)
                 
             })
             }
         },
         updateData() {
             this.dialog = true;
             this.users.append('username', this.form.username);
             this.users.append('email', this.form.email);
             this.users.append('noTelp', this.form.noTelp);
             this.users.append('password', this.form.password);
             
             var uri = this.$apiUrl + '/user/edit/' + this.$session.get('username');
             console.log(uri);
             this.load = true;
             this.$http.post(uri, this.users).then(response => {
                 if(response.data.error == true ){
                      console.log(response.data.error,'error');
                      this.snackbar = true; //mengaktifkan snackbar
                      this.color = 'red'; //memberi warna snackbar
                      this.text = response.data.message; //memasukkan pesan ke snackbar
                      this.load = false;
                  }
                  else{
                      this.snackbar = true; //mengaktifkan snackbar
                      this.color = 'green'; //memberi warna snackbar
                      this.text = 'SUCCESS'; //memasukkan pesan ke snackbar
                      this.$router.push('/');
                      this.load = false;
                      this.$session.start();
                      this.$session.set( 'username', this.response.data[0].username);
                  }
             }).catch(error => {
                 this.errors = error
                 this.snackbar = true;
                 this.text = 'Email Sudah Terdaftar';
                 this.color = 'red';
                 this.load = false;
                 this.typeInput = 'new';
             })
             
         },
         editHandler(item) {
             this.typeInput = 'edit';
             this.dialog = true;
             this.form.username = item.username;
             this.form.email = item.email;
             this.form.noTelp = item.noTelp;
             this.updatedPassword = item.password;
                 this.updatedId = item.id
         },
         setForm() {
                 this.updateData()
                 this.dialog = false
             
         },
         resetForm() {
             this.form = {
                 username: '',
                 email: '',
                 noTelp: '',
             }
             this.dialog = false
         },
         onSelectedFile(event){
             this.selectedFile = event.target.files[0]
         },
         onUpload(){
             
         }
     },
     mounted() {
         this.getData();
     }
 }
</script>