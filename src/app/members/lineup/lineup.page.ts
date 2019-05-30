import {Component, OnInit} from '@angular/core';
import {LineupService} from '../../services/lineup.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-lineup',
    templateUrl: './lineup.page.html',
    styleUrls: ['./lineup.page.scss'],
})
export class LineupPage implements OnInit {
    teams: Observable<any>;

    constructor(private lineupService: LineupService) {
    }

    ngOnInit() {
          this.teams = this.lineupService.listLineups();
        //     .subscribe( linenups => {
        //     console.log(linenups);
        // });
    }
}
