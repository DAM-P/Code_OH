import { _decorator, Component, Node, Animation } from 'cc';
import { IState } from '../Base/IState'; // 导入接口
import { PlayerInput } from '../../Input/Input';
import { StateMachine } from '../Base/StateMachine'
import { PlayerController } from '../../Player/PlayerController'
import { PlayerState } from './PlayerState';
import { PlayerStateIdle } from './PlayerStateIdle';
const { ccclass, property } = _decorator;

@ccclass('PlayerStateMachine')
export class PlayerStateMachine extends StateMachine {
    @property([Component])
    states: PlayerState[] = [];
    @property(Node)
    inputNode: Node | null = null;

    private animator: Animation | null = null;
    private input: any = null;
    private player: any = null;
    protected stateTable: Map<any, IState> = new Map();



    onLoad() {
        this.animator = this.node.getComponent(Animation);
        this.input = this.inputNode.getComponent(PlayerInput);
        this.player = this.node.getComponent(PlayerController);

        for (let state of this.states) {
            state.Initialize(this.animator, this, this.input, this.player);
            this.stateTable.set(state.constructor, state);
        }
    }

    start() {
        
        this.switchOn(this.stateTable.get(PlayerStateIdle));
           
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

    get CurrentStateType(): any {
        return this.currentState ? this.currentState.constructor : null;
    }
}
