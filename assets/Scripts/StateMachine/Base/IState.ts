export interface IState {
    Enter(): void;
    Exit(): void;
    LogicUpdate(dt :number): void;
}
