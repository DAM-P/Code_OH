import { _decorator, Component, Node, Vec2, Vec3, Input, EventTouch, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerInput')
export class PlayerInput extends Component {
    @property(Node)
    joystickBg: Node | null = null;
  
    @property(Node)
    joystickHandle: Node | null = null;

   private _startPos: Vec3 = new Vec3();
    public _touchStart: boolean = false;

    public axis: Vec3 | null = null;
   // public move: boolean=false ;

    onEnable() {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }
    start() {
       
    }
    onDisable() {
        this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    private onTouchStart(event: EventTouch) {
        const uiLocation = event.getUILocation();
        this._startPos.set(uiLocation.x, uiLocation.y, 0); 
        const localPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(this._startPos);

        this.setJoystick(localPos);
        this._touchStart = true;
    }

    private onTouchMove(event: EventTouch) {
        if (!this._touchStart) return;
        const uiLocation = event.getUILocation();
        const localPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(uiLocation.x, uiLocation.y, 0));

        this.setJoystick(localPos);
    }


    private setJoystick(localPos: Vec3) {
        const delta = localPos.subtract(this.joystickBg.position);
        const distance = Math.min(delta.length(), this.joystickBg.getComponent(UITransform).width / 2); // 限制手柄移动范围
        const direction = delta.normalize();

        this.axis = direction;
        this.joystickHandle.setPosition(direction.x * distance, direction.y * distance);

    }
    private onTouchEnd() {
    
        this.joystickHandle.setPosition(new Vec3(0, 0, 0)); // 重置手柄位置

        this._touchStart = false;
    }
}
