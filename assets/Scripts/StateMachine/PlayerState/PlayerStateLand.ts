import { _decorator, Component, Node } from 'cc';
import { PlayerStateIdle } from './PlayerStateIdle'
import { PlayerState } from './PlayerState';
const { ccclass, property } = _decorator;
@ccclass('PlayerStateLand')
export class PlayerStateLand extends PlayerState {

    Enter() {
        this.currentSpeedX = Math.abs(this.player.moveSpeedX);
        super.Enter();
 
    }

    LogicUpdate(dt: number) {


       

        if (this.player.GroundDetect._isGrounded) {
            this.stateMachine.switchStateByType(PlayerStateIdle);
        }
    }
}


