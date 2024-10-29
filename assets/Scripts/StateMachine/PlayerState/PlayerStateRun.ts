import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { PlayerState } from './PlayerState'
import { PlayerStateIdle } from './PlayerStateIdle'
import { PlayerStateJump } from './PlayerStateJump'
import { PlayerStateRolling } from './PlayerStateRolling';
@ccclass('PlayerStateRun')
export class PlayerStateRun extends PlayerState {
    @property
    public speed: number = 5;

    @property
    public acceleration: number = 0;

    @property
    public audioClass: any = null; // 假设 audioClass 在 Cocos 中已定义

    public Enter() {
        super.Enter();
        this.currentSpeedX = Math.abs(this.player.moveSpeedX);
        
    }
    private moveTowards(current: number, target: number, maxDelta: number): number {
        if (Math.abs(target - current) <= maxDelta) {
            return target;
        }
        return current + Math.sign(target - current) * maxDelta;

    }
    public LogicUpdate(dt: number) {

        if (this.input._jumpStart&&this.player.GroundDetect.isGrounded) {
            this.input._jumpStart = false;
            this.stateMachine.switchStateByType(PlayerStateJump);
        }
       
        if (!this.input._touchStart) {
            
            this.stateMachine.switchStateByType(PlayerStateIdle);
        }
        if (this.input._rollingStart) {
            this.stateMachine.switchStateByType(PlayerStateRolling);
        }
        
      //  console.log(this.currentSpeedX);
        this.currentSpeedX = this.moveTowards(this.currentSpeedX, this.speed, this.acceleration * dt);
        this.player.Move(this.currentSpeedX );
    }

    public Exit() {

    }
        

}


