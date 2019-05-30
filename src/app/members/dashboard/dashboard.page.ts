import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    constructor(private authService: AuthenticationService,
                private userService: UserService,
                private storage: Storage) {
    }

    ngOnInit() {
        this.userService.getInfo().subscribe();
    }

    logout() {
        this.authService.logout();
    }
}
