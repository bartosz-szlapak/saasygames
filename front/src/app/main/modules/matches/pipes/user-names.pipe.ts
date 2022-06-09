import { Pipe, PipeTransform } from '@angular/core';
import { MatchPlayer } from '@root/app/shared/models/match-player';

@Pipe({
  name: 'userNames'
})
export class UserNamesPipe implements PipeTransform {

  transform(players: MatchPlayer[]): string {
    return players?.map(p => p.playerName).join(', ');
  }

}
