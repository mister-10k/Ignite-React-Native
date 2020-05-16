import { StatusLog, StatusLogType, Habit, Days } from "../shared/types";
import moment from "moment";

export class DataShareService {
    constructor() {}

    public static getHabitStreak(habit: Habit, endDate: moment.Moment): number {
        const start = moment();
        if (habit.statusLog.length == 0) {
          return 0;
        }

        const tempDate = moment(endDate);
        const map = new Map<Days,number>();
        this.getDaysBetweenFrequencies(map, habit.frequency);      
        let streak = 0;

        while (!habit.frequency.includes(tempDate.day())) {
          tempDate.subtract(1, 'days');
        }   

        let streaking = habit.statusLog.findIndex(x => moment(x.date).isSame(tempDate, 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1;

        if (!streaking) { // if not from selected date then try day before
          const daysToSubtract = map.get(tempDate.day());
          tempDate.subtract(daysToSubtract, 'days');
          streaking = habit.statusLog.findIndex(x => moment(x.date).isSame(tempDate, 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1;
        }

        if (streaking) {
          while (streaking) {
            streak++;
            const daysToSubtract = map.get(tempDate.day());
            tempDate.subtract(daysToSubtract, 'days');
            streaking = habit.statusLog.findIndex(x => moment(x.date).isSame(tempDate, 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1;
          }
        } else {
          let lowerDatedLogExists = habit.statusLog.findIndex(x => moment(x.date).isBefore(tempDate, 'day') && habit.frequency.includes(moment(x.date).day())) > -1; // avoid infinitw loop
          if (lowerDatedLogExists) {
            while (!streaking) {
              streak--;
              const daysToSubtract = map.get(tempDate.day());
              tempDate.subtract(daysToSubtract, 'days');
              streaking = habit.statusLog.findIndex(x => moment(x.date).isSame(tempDate, 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1;
            }
          }
        }

      console.log(habit.name + ' DataShareService.getHabitStreak time: ' + moment().diff(start, 'milliseconds') + ' milliseconds.');
      return streak;
    }

    public static getStatusLogCompletionsCount(statusLog: Array<StatusLog>) {
      let count = 0;
      statusLog.forEach(log => {
        if (log.type == StatusLogType.Complete) {
          count++;
        }
      });

      return count;
    }

    public static getHabitBestCount(habit: Habit) {
      let best = 0, streak = 0, i = 0;
      let firstStreakDay = true;
      let map = new Map<Days,number>();

      this.getDaysBetweenFrequencies(map, habit.frequency);

      while(i < habit.statusLog.length) {
        const tempDate = moment(habit.statusLog[i].date);
        const dayNum = tempDate.day();

        if (habit.frequency.findIndex(x => x == dayNum) > -1) {
          const streakDayBefore = tempDate.subtract(map.get(dayNum), 'days');
          if (habit.statusLog.findIndex(x => streakDayBefore.isSame(moment(x.date), 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1 || firstStreakDay) {
            firstStreakDay = false; // used for the first streak day only
            streak++;
          } else {
            if (streak > best) {
              best = streak;
            }
            streak = 1;
          }
        }

        i = i + 1;
      }

      if (streak > best) {
        best = streak;
      }

      return best;
    }

    /**
     * Helper method for getHabitBestCount
     *
     * @param map where a frequency (day) will be mapped with how many days are between it and the frequency (day) before it.
     * @param frequency represents how often a habit occurs.
     */
    private static getDaysBetweenFrequencies(map: Map<Days,number>, frequency: Array<Days>): void {
      for (let i = 0; i < frequency.length; i++) {
        let j = i - 1;

        if (j != -1) {
          map.set(frequency[i], frequency[i] - frequency[j]);
        } else {
          j = frequency.length - 1;
          const m = moment();
          const tempDate1 = moment(m).day(frequency[i]);
          const tempDate2 = moment(m).day(frequency[j] - 7);
          const daysBefore = tempDate1.diff(tempDate2, 'day');
          map.set(frequency[i], daysBefore);
        }
      }
    }

    public static sameStatusLogs(sl1: Array<StatusLog>, sl2: Array<StatusLog>): boolean {
      if (sl1.length != sl2.length) {
        return false;
      }

      for (let i = 0; i < sl1.length; i++) {
        if (!(moment(sl1[i].date).isSame(moment(sl2[i].date), 'day') && sl1[i].type == sl2[i].type)) {
          return false;
        }
      }

      return true;
    }

    // currently skips are being addded to completion rate percentage
    public static getCompletionRatesByWeek(weekRanges: Array<{startOfWeek: moment.Moment, endOfWeek: moment.Moment}>, habit: Habit) {      
      let data = [];

      for (let i = 0; i < weekRanges.length; i++) {
        let completedDaysForRange = 0;
        let percentageComplete = 0;

        habit.statusLog.forEach(statusLog => {
          if (weekRanges[i].startOfWeek.isSameOrBefore(statusLog.date, 'day') && weekRanges[i].endOfWeek.isSameOrAfter(statusLog.date, 'day')) {
            completedDaysForRange++;
          }
        });

        percentageComplete = Math.round((completedDaysForRange/(weekRanges[i].endOfWeek.diff(weekRanges[i].startOfWeek, 'days')+1))*100);
        
        data.push({ index: i, x: weekRanges[i].startOfWeek.format('MMM Do') + ' -\n' +  weekRanges[i].endOfWeek.format('MMM Do'), y: percentageComplete});
      }

      return data;
    }

    // currently skips are being addded to completion rate percentage
    public static getCompletionRatesByMonth(monthsRange: Array<moment.Moment>, habit: Habit) {
      let data = [];

      for (let i = 0; i < monthsRange.length; i++) {
        let completedDaysForRange = 0;
        let percentageComplete = 0;

        const startDate = moment(monthsRange[i]);
        const endDate = moment(monthsRange[i]).endOf('month');

        habit.statusLog.forEach(statusLog => {
          if (startDate.isSameOrBefore(statusLog.date, 'day') && endDate.isSameOrAfter(statusLog.date, 'day')) {
            completedDaysForRange++;
          }
        });

        percentageComplete = Math.round((completedDaysForRange/(endDate.diff(startDate, 'days')+1))*100);

        data.push({ index: i, x: monthsRange[i].format('MMM YYYY'), y: percentageComplete});
      }


      return data;
    }

    public static getFrequencyAbbreviations(frequency: Array<Days>): string {
      let abbreviations = '';
      frequency.forEach((f,index) => {
        let letter = '';
        if (f == Days.Sunday || f == Days.Saturday) {
          letter = 'S';
        } else if (f == Days.Monday) {
          letter = 'M'
        } else if (f == Days.Tuesday || f == Days.Thursday) {
          letter = 'T'
        } else if (f == Days.Wednesday) {
          letter = 'W'
        } else { // Friday
          letter = 'F'
        }


        if (index == 0) {
          abbreviations += letter;
        } else {
          abbreviations +=  ',' + letter;
        }
      });

      return abbreviations;
    }
}