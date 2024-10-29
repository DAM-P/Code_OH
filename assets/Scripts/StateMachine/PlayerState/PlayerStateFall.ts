import { _decorator, Component, Node } from 'cc';
import { PlayerStateIdle } from './PlayerStateIdle'
import { PlayerState } from './PlayerState';
const { ccclass, property } = _decorator;

@ccclass('PlayerStateFall')
export class PlayerStateFall extends PlayerState {
    
    public speed: number = 5;

    
    private _isJumping: boolean = false;

    Enter() {
        super.Enter();
        this.input._jumpStart = false;
        this.player.setVelocityY(0);;
    }

    LogicUpdate(dt: number) {

        // this.player.Move(5);
        this.player.Move(this.speed);

        if (this.player.GroundDetect._isGrounded) {
            this.stateMachine.switchStateByType(PlayerStateIdle);
        }
    }
}


