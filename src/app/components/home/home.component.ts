import { Component, OnInit } from '@angular/core';
import {FootballDataService} from "../../services/football-data.service";
import {Competition} from "../../interfaces/competition";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  competitions: Competition[];
  loading: boolean;

  constructor(
    private footballDataService: FootballDataService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.footballDataService.getCompetitions().subscribe(data => {
      this.loading = false;
      this.competitions = data["competitions"];
    })
  }
}
