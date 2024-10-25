import { _decorator, Component, Animation, Vec3, log, debug } from 'cc';
// ����ӿ�
import { PlayerState } from './PlayerState'
import { PlayerStateRun } from './PlayerStateRun'
const { ccclass, property } = _decorator;

@ccclass('PlayerStateIdle')
export class PlayerStateIdle extends PlayerState {
    @property
    public acceleration: number = 20;

    public Enter() {
        super.Enter();
        this.currentSpeedX = Math.abs(this.player.moveSpeedX);
        this.player.setVelocityY(0);
    }
    private  moveTowards(current: number, target: number, maxDelta: number): number {
        if (Math.abs(target - current) <= maxDelta) {
            return target;
        }
        console.log(current);
        return current + Math.sign(target - current) * maxDelta;

    }

    public LogicUpdate(dt:number) {
      
        
        if (this.input._touchStart) {
            this.stateMachine.switchStateByType(PlayerStateRun);
        }
        //console.log(this.player.node.scale.x);
        if (this.player.rigidBody.linearVelocity.x != 0) {
            
            this.currentSpeedX = this.moveTowards(this.player.rigidBody.linearVelocity.x, 0, this.acceleration * dt); 
           
            this.player.setVelocityX(this.currentSpeedX );
  
        }
       
        
    }
    public Exit() {
        
        
    }
}