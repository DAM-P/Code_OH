import { _decorator, Component, Node, Vec3 } from 'cc';
import { IState } from '../Base/IState'
const { ccclass, property } = _decorator;



@ccclass('StateMachine')
export class StateMachine extends Component {
    protected currentState: IState | null = null;
    protected stateTable: Map<any, IState> = new Map();

    get CurrentStateType(): any {
        return this.currentState ? this.currentState.constructor : null;
    }

    update(dt: number) {
        if (this.currentState) {
            this.currentState.LogicUpdate(dt);
        }
    }

    protected switchOn(newState: IState) {
        this.currentState = newState;
        this.currentState.Enter();
    }

    public switchState(newState: IState) {
        if (this.currentState) {
            this.currentState.Exit();
        }
        this.switchOn(newState);
    }
   


    public switchStateByType(newStateType: any) {
        if (this.CurrentStateType !== newStateType && this.stateTable.has(newStateType)) {
            this.switchState(this.stateTable.get(newStateType));
        }
    }
}
