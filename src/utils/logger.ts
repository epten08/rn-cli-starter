type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

class LoggerService {
  private logs: LogEntry[] = [];
  private maxLogs = 100;
  private isEnabled = __DEV__;

  //log info
  info(message: string, data?: any): void {
    this.log('info', message, data);
  }

  //log warning
  warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }

  //log error
  error(message: string, data?: any): void {
    this.log('error', message, data);
  }

  //log debug
  debug(message: string, data?: any): void {
    this.log('debug', message, data);
  }

  //internal log method
  private log(level: LogLevel, message: string, data?: any): void {
    if (!this.isEnabled) return;

    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = { level, message, data, timestamp };

    // add log to the array
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift(); // remove oldest log
    }

    // print to console with color coding
    const prefix = `[${timestamp}] [${level.toLocaleUpperCase()}]`;
    const fullMessage = data ? `${prefix} ${message}` : `${prefix} ${message}`;

    switch (level) {
      case 'info':
        console.log(fullMessage, data || '');
        break;
      case 'warn':
        console.warn(fullMessage, data || '');
        break;
      case 'error':
        console.error(fullMessage, data || '');
        break;
      case 'debug':
        console.debug(fullMessage, data || '');
        break;
    }
  }

  //retrieve logs
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  //clear logs
  clearLogs(): void {
    this.logs = [];
  }

  //enable or disable logging
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  //set maximum number of logs to retain
  setMaxLogs(max: number): void {
    this.maxLogs = max;
  }

  // export logs as JSON
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

export const Logger = new LoggerService();
