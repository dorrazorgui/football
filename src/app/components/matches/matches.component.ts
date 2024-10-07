import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FootballDataService} from "../../services/football-data.service";
import {Competition} from "../../interfaces/competition";
import {Match} from "../../interfaces/match";
import {BreadcrumbItem} from "../../models/breadcrumb-item";
import * as moment from 'moment';
import { interval } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit, OnDestroy {
  competitionName: string;
  competition: Competition;
  matches: Match[];
  loading: boolean;
  breadcrumbItems: BreadcrumbItem[];
  moment: any = moment;
  interval;

  constructor(
    private route: ActivatedRoute,
    private footballDataService: FootballDataService
  ) {
  }

  ngOnInit(): void {
    this.competitionName = this.route.snapshot.params.competitionName;
    localStorage.setItem("lastCompetitionCode", this.competitionName);
    this.loading = true;
    this.footballDataService.getMatches(this.competitionName).subscribe(
      data => {
      this.loading = false;
      this.competition = data["competition"];
      this.matches = data["matches"];
      this.breadcrumbItems = [new BreadcrumbItem(this.competition.name, "#", true)]
      // call every minute
      this.interval = interval(1000 * 60).subscribe(value => {
        this.getMatchInfos();
      })
    },
      error => {
        console.log(error.error.message);
        this.loading = false;
      })
  }

  ngOnDestroy() {
    this.interval.unsubscribe();
  }

  private getMatchInfos(){
    this.footballDataService.getMatches(this.competitionName).subscribe(
      data => {
      this.matches = data["matches"];
    },
      error => {
        console.log(error.error.message);
        this.loading = false;
      })
  }

}
