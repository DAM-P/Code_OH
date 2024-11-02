import { _decorator, Component, Animation, log } from 'cc';
import { IState } from '../Base/IState'; // 导入接口
import { PlayerInput } from '../../Input/Input';
import { PlayerStateMachine } from './PlayerStateMachine'
import { PlayerController } from '../../Player/PlayerController'
const { ccclass, property } = _decorator;

@ccclass('PlayerState')
export class PlayerState extends Component implements IState {
    @property
    private stateName: string = '';

    private hashStateName: number = 0;
    protected currentSpeedX: number = 0;
    protected currentSpeedY: number = 0;
    protected stateStartTime: number = 0;
    protected animator: Animation | null = null;
    protected input: PlayerInput | null = null;
    protected stateMachine: PlayerStateMachine | null = null;
    protected player: PlayerController | null = null;

    protected get IsAnimationFinished(): boolean {
        return this.stateTime >= (this.animator ? this.animator.getState(this.stateName).duration : 0);
    }

    protected get stateTime(): number {
        return Date.now() - this.stateStartTime;//毫秒数
    }

    onLoad() {

    }

    public Initialize(animator: Animation, stateMachine: PlayerStateMachine, input: PlayerInput, player: PlayerController) {
        this.animator = animator;
        this.stateMachine = stateMachine;
        this.input = input;
        this.player = player;
    }

    public Enter() {
        log(`Enter State: ${this.constructor.name}`);
        if (this.animator) {
            this.animator.play(this.stateName);
        }
        this.stateStartTime = Date.now();
    }

    public Exit() { }

    public LogicUpdate(dt: number) { }

}
