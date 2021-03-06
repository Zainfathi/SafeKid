import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


  var firebaseConfig = {
    apiKey: "AIzaSyDMMtNaoakN-KNtcut2R2AgOhVJWMAjj7U",
    authDomain: "safekid-demo-b3e44.firebaseapp.com",
    databaseURL: "https://safekid-demo-b3e44.firebaseio.com",
    projectId: "safekid-demo-b3e44",
    storageBucket: "safekid-demo-b3e44.appspot.com",
    messagingSenderId: "1064185719790",
    appId: "1:1064185719790:web:6ebcadd6266fa510b1fcff",
    measurementId: "G-NVTN14GYXW"
  };
  
  // Initialize Firebase
  class fire{
    constructor(){
        firebase.initializeApp(firebaseConfig)
        this.auth=firebase.auth()
        this.db=firebase.database()
        this.storage=firebase.storage()
    }

    signin(email, password){
        return this.auth.signInWithEmailAndPassword(email,password)
    }

    logout(){
        return this.auth.signOut()
    }

    async register(firstname,lastname,email,password,confirmpassword,par,images) {
      await this.auth.createUserWithEmailAndPassword(email, password).then(response => {
        this.db.ref('Users/' + response.user.uid)
       .set({
        firstname:firstname,
        lastname:lastname,
        email:email,
        role:par,
        images:"https://firebasestorage.googleapis.com/v0/b/safekid-demo-b3e44.appspot.com/o/images%2Fmarc.jpg?alt=media&token=9147f0f5-2c53-4cc5-84d8-feff5852aaca"
       })})
     

      return this.auth.currentUser.updateProfile({
        displayName: lastname
      })
    }
  
    isInitialized() {
      return new Promise(resolve => {
        this.auth.onAuthStateChanged(resolve)
      })
    }
  
    getCurrentUsername() {
      return this.auth.currentUser && this.auth.currentUser.displayName
    }
  }
  

  export default new fire()
  export const db = firebase.database();
  export const auth = firebase.auth();
  export const storage = firebase.storage();