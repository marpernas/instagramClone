import { Component, OnInit } from '@angular/core';
import *as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {

    var config = {
      apiKey: "AIzaSyA8k3ltVPOoNNk7_xbfO2XRn1t8KQCPVG0",
      authDomain: "jta-instagram-clone-f9bb3.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-f9bb3.firebaseio.com",
      projectId: "jta-instagram-clone-f9bb3",
      storageBucket: "jta-instagram-clone-f9bb3.appspot.com",
      messagingSenderId: "955214387197"
    };
    
    firebase.initializeApp(config)
  }
}
