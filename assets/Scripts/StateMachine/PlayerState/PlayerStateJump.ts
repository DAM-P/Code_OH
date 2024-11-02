import { _decorator, Component, Animation, Vec3, log, debug, sp } from 'cc';
// 导入接口
import { PlayerState } from './PlayerState'
import { PlayerStateIdle } from './PlayerStateIdle'
import { PlayerStateFall } from './PlayerStateFall';
const { ccclass, property } = _decorator;

@ccclass('PlayerStateJump')
export class PlayerStateJump extends PlayerState {
    @property
    public jumpForce: number = 10;

    @property
    public speed: number = 5;

    @property
    public limitJumpSpeed: number = 20;
;
    private _isJumping: boolean = false;

    Enter() {
        super.Enter();
        this._isJumping = true;
        this.player.setVelocityY(this.jumpForce);
        this.input._jumpStart = false;
        //console.log("ISJUMPING");
    }

    LogicUpdate(dt: number) {
        
        this.player.Move(this.speed);
        
        if (this.player.isFalling) {
            
            this.stateMachine.switchStateByType(PlayerStateFall);
        }
    }
    
}


