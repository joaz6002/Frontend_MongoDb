import { Component } from '@angular/core';
import { FootballService } from '../service/football.service';
import { Player } from './player.model';
import { Team } from './team.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Football-Application';
  teams: Team[] = [];
  selectedTeam?: Team ;
  players: Player[] = [];
  selectedPlayer?: Player;

  constructor(private footballService: FootballService) {
    this.getTeams();
  }

  getTeams() {
    this.footballService.getTeams().subscribe(teams => this.teams = teams);
  }

  selectTeam(team: Team) {
    this.selectedTeam = team;
    this.getPlayers(team._id);
  }

  getPlayers(teamId: number) {
    this.footballService.getPlayersOfTeam(teamId).subscribe(players => this.players = players);
  }

  selectPlayer(player: Player) {
    this.selectedPlayer = player;
  }

  addPlayer(player: Player) {
    if (this.selectedTeam) {
      this.footballService.addPlayerToTeam(player, this.selectedTeam._id).subscribe(() => {
        if (this.selectedTeam?._id) {
          this.getPlayers(this.selectedTeam._id);
        }
      });
    } else {
      console.error('No team selected');
    }
  }
  
  removePlayer(playerId: string) {
    if (this.selectedTeam) {
      this.footballService.removePlayerFromTeam(playerId).subscribe(() => {
        if (this.selectedTeam?._id) {
          this.getPlayers(this.selectedTeam._id);
        }
      });
    } else {
      console.error('No team selected');
    }
  }
  
  
  
}
