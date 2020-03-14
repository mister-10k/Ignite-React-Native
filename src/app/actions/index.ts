import { Action } from "../shared/types";

export function sendTheme(theme: string): Action {
    return {
      type: 'NEW-THEME',
      payload: theme
    }
  }