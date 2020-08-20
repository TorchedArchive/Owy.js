declare module 'owy' {
  namespace owy {
    interface Style {
      interval: number;
      stages: string[];
    }

    interface SpinnerOptions {
      style: owy.Style | string;
      color: string;
      dual?: boolean;
    }

    export const styles: { [x in 'line' | 'tripleLine' | 'dots']: owy.Style };
    export class ProgressBar {
      public filledLength: number;
      public emptyLength: number;
      public filled: string;
      public empty: string;

      public init(): void;
      public next(): void;
      public progress(percent: number): void;
    }

    export class Spinner {
      constructor(options: owy.SpinnerOptions);

      public options: owy.SpinnerOptions;
      public style: owy.Style;
      public color: string;
      public text: string;
      public spin: NodeJS.Timeout;
      public dual: boolean;
      public pos: number;
      public req: number;

      public start(text: string): this;
      public next(): boolean;
      public stop(clear?: boolean): this;
      public info(text: string): this;
      public success(text: string): this;
      public warn(text: string): this;
      public fail(text: string): this;
      public symbol(sym: string, text: string): this;
      public clear(): void;
    }
  }

  export = owy;
}