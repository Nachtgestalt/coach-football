import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-lineup',
    templateUrl: './lineup.page.html',
    styleUrls: ['./lineup.page.scss'],
})
export class LineupPage implements OnInit {
    teams = [
        {
            id: 1,
            photo: `https://picsum.photos/200/300?random=${Math.floor((Math.random() * 100) + 1)}`,
            name: `Real madrid`
        },

        {
            id: 2,
            photo: `https://picsum.photos/200/300?random=${Math.floor((Math.random() * 100) + 1)}`,
            name: `Barcelona`
        },
        {
            id: 3,
            photo: `https://picsum.photos/200/300?random=${Math.floor((Math.random() * 100) + 1)}`,
            name: `Bayer`
        },
        {
            id: 4,
            photo: `https://picsum.photos/200/300?random=${Math.floor((Math.random() * 100) + 1)}`,
            name: `Real madrid`
        },
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
