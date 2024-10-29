import { _decorator, Component, Node } from 'cc';
import { PlayerState } from './PlayerState'
import { PlayerStateRun } from './PlayerStateRun'
import { PlayerStateJump } from './PlayerStateJump'
import { PlayerStateIdle } from './PlayerStateIdle';

const { ccclass, property } = _decorator;
@ccclass('PlayerStateRolling')
export class PlayerStateRolling extends PlayerState {
    @property
    rollingSpeed: number = 40;
    @property
    rollingTime: number = 0.5;

    public Enter() {
        super.Enter();
        this.input._rollingStart = false;
        this.currentSpeedX = this.player.moveSpeedX;
        this.player.setVelocityX(this.rollingSpeed*this.player.node.scale.x);
    }

    public LogicUpdate(dt: number) {
       
        if (this.stateTime > this.rollingTime) {
            this.stateMachine.switchStateByType(PlayerStateIdle);

        }
        if (this.input._jumpStart&&this.player.GroundDetect.isGrounded) {

            this.input._jumpStart = false;
            this.stateMachine.switchStateByType(PlayerStateJump);

        }
    }

    public Exit() {
        this.player.setVelocityX(this.currentSpeedX);
    }
}


