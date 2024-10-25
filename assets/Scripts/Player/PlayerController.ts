import { _decorator, Component, Node, Vec2, Vec3, Input, EventKeyboard, input, KeyCode,RigidBody2D, sp } from 'cc';
import { PlayerInput } from '../Input/Input';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    

    @property(Node)
    inputNode: Node | null = null;

    rigidBody: RigidBody2D | null = null;
    input: PlayerInput | null = null;

    public moveSpeedX: number=0;
    start() {
        this.input = this.inputNode.getComponent(PlayerInput);
        this.rigidBody = this.node.getComponent(RigidBody2D);
        this.moveSpeedX = this.rigidBody.linearVelocity.x;
    }

    update() {
        //this.setvelocityX(this.input.axis);

    }
     public setVelocityX(dir: number) {
        if (this.rigidBody&&dir!=null) {
            // 获取当前刚体速度
            let velocity = this.rigidBody.linearVelocity;
           
            // 设置新速度，保持 y 轴速度不变，只改变 x 轴速度
            velocity.x = dir;
            
            this.rigidBody.linearVelocity = velocity;

            
        }
    }
    public setVelocityY(dir: number) {
        if (this.rigidBody && dir != null) {
            // 获取当前刚体速度
            let velocity = this.rigidBody.linearVelocity;

            // 设置新速度，保持 y 轴速度不变，只改变 x 轴速度
            velocity.y = dir;

            //console.log(velocity);
            this.rigidBody.linearVelocity = velocity;
        }
    }

    public setVelocity(direction: Vec3) {
        let dir = this.axisHandle(direction);
        this.setVelocityX(dir.x);
        this.setVelocityY(dir.y);
    }
    public axisHandle(axis: Vec3) {
        let dir = new Vec3();
        if (Math.abs(axis.x) > 0.3) {
            dir.x = Math.sign(axis.x);
            
        }
        if (Math.abs(axis.y) > 0.9) {
            dir.y = Math.sign(axis.y);
        }
        return dir;

    }

    public Move(speed: number) {
        
        let AxisX = Math.sign(this.input.axis.x);
        if (this.input._touchStart) {
            this.node.scale = new Vec3(AxisX, 1, 0);
        }
       
        this.setVelocityX(speed * AxisX);
    }
}
