import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { data } from 'jquery';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $:any;

declare interface User {
    name?: string;
    email?: string; //  must be valid email format
    phone?: string; // required, value must be equal to password.
    number?: string;
}


@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit{
  focus;
  focus1;
  focus2;
  name;
  phone;
  email;

    test : Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    public register: User;

    constructor(private element : ElementRef, private http: HttpClient) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('register-page');
        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit(){

        this.register = {
            email: '',
            name: '',
        }


        this.checkFullPageBackgroundImage();

        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    save(model: User, isValid: boolean) {
    // call API to save customer
        if(isValid){
            console.log(model, typeof(model));
            
            this.http.post("https://api.ecell.in/summit/vsm/", model).subscribe(
            data => {
                Swal.fire({
                    title: "You have been registered!",
                    buttonsStyling: false,
                    customClass:{
                      confirmButton: "btn btn-primary",
                    },
                    icon: "success"
                }).then(
                    (result) => {
                        window.location.assign("https://ecell.in/esummit/")
                    }
                )
            }
        )
        }
    }

    
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('register-page');
    }
    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    submit () {
        console.log(this.name, this.email, this.phone);
        var body = new FormData();
        body.append('name', this.name);
        body.append('email', this.email);
        body.append('phone', this.phone);

        this.http.post("https://api.ecell.in/summit/vsm/", body).subscribe(
            data => {
                alert('registration complete')
            }
        )
    }
}
