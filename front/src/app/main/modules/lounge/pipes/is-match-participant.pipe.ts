import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '@root/app/shared/models/match';

@Pipe({
  name: 'isMatchParticipant'
})
export class IsMatchParticipantPipe implements PipeTransform {

  transform(match: Match, userId: string): boolean {
    return match?.players.some(p => p.userId === userId);
  }

}
