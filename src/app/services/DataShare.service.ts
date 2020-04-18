import { StatusLog, StatusLogType } from "../shared/types";
import moment, { Moment } from "moment";

export class DataShareService {
    constructor() {}

    public static getStatusLogStreak(statusLog: Array<StatusLog>, endDate: moment.Moment): number {
        if (statusLog.length == 0) {
          return 0;
        }

        const tempDate = moment(endDate);
        let streak = 0;
        let streaking = statusLog.findIndex(x => moment(x.date).isSame(tempDate, 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1;
        if (!streaking) { // if not from selected date then try day before
          tempDate.subtract(1, 'days');
          streaking = statusLog.findIndex(x => moment(x.date).isSame(tempDate, 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1;
        }

        if (streaking) {
          while (streaking) {
            streak++;
            tempDate.subtract(1, 'days');
            streaking = statusLog.findIndex(x => moment(x.date).isSame(tempDate, 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1;
          }
        } else {
          const lowerDatedLogExists = statusLog.findIndex(x => moment(x.date).isBefore(tempDate)) > -1;
          while (!streaking && lowerDatedLogExists) {
            streak--;
            tempDate.subtract(1, 'days');
            streaking = statusLog.findIndex(x => moment(x.date).isSame(tempDate, 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1;
          }
        }

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

    public static getStatusLogBestCount(statusLog: Array<StatusLog>) {
      let best = 0, streak = 0, i = 0;

      while (i < statusLog.length) {
          if (statusLog.findIndex(x => moment(statusLog[i].date).subtract(1, 'day').isSame(moment(x.date), 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1 || i == 0) {
            streak++;
          } else {
            if (streak > best) {
              best = streak;
            }
            streak = 1;
          }

          i++;
      }

      if (streak > best) {
        best = streak;
      }

      return best;
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
}