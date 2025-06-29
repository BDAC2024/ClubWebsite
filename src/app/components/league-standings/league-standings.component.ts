import { Component, OnInit } from '@angular/core';
import { MatchResultsService } from 'src/app/services/match-results.service';
import { ScreenService } from 'src/app/services/screen.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AggregateType, MatchType } from 'src/app/models/match-enum';
import { LeagueStanding } from 'src/app/models/league-standing';
import { MatchService } from 'src/app/services/match.service';
import { GlobalService } from 'src/app/services/global.service';
import { RefDataService } from 'src/app/services/ref-data.service';
import { RefData, Season } from 'src/app/models/refData';
import { ClubEventService } from 'src/app/services/club-event.service';
import { ClubEvent } from 'src/app/models/club-event';

@Component({
  selector: 'app-league-standings',
  templateUrl: './league-standings.component.html',
  styleUrls: ['./league-standings.component.css']
})
export class LeagueStandingsComponent implements OnInit {

  public allMatches: ClubEvent[] = [];
  public displayedColumns: string[];
  public isLoading: boolean = false;
  public standings: LeagueStanding[] = [];
  public refData!: RefData;
  public selectedSeason!: number;
  public selectedAggregateType: AggregateType = AggregateType.Spring;

  constructor(
    public matchResultsService: MatchResultsService,
    public matchService: MatchService,
    private refDataService: RefDataService,
    private globalService: GlobalService,
    public screenService: ScreenService,
    public clubEventService: ClubEventService
  ) { 
    this.displayedColumns = ["position", "name", "weight", "points"];
  }

  ngOnInit(): void {
    this.getRefData();

  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedAggregateType = parseInt(tabChangeEvent.tab.ariaLabel) as AggregateType;

    this.loadLeague();
  }

  public loadLeague(): void
  {
    this.isLoading = true;
    this.standings = [];
    
    this.globalService.setStoredSeason(this.selectedSeason);
    this.matchResultsService.readLeagueStandings(this.selectedAggregateType, this.selectedSeason)
    .subscribe(data => {
      this.isLoading = false;
      this.standings = data;

    });
  }

  public anyOfType(aggType: number): boolean {
    return this.allMatches.filter(m => m.aggregateType === aggType).length > 0;
  }

  private getRefData() {
    this.refDataService.getRefData()
    .subscribe(data => {
      this.refData = data;
      this.selectedSeason = this.globalService.getStoredSeason(data.currentSeason);
      this.getMatches();
    });

  }

  public getMatches() {
    this.isLoading = true;
    this.globalService.setStoredSeason(this.selectedSeason);
    this.clubEventService.readEvents(this.selectedSeason)
    .subscribe(data => {
      this.isLoading = false;
      this.allMatches = data;
      this.loadLeague();
    });
  }

}
