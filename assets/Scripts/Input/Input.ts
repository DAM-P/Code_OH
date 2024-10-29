import { _decorator, Component, Node, Vec3, Input, EventTouch, UITransform, Button, EventKeyboard, KeyCode ,input} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerInput')
export class PlayerInput extends Component {
    @property(Node)
    joystickBg: Node | null = null;

    @property(Node)
    joystickHandle: Node | null = null;

    @property([Node])
    buttons: Node[] = [];

    @property(Node)
    touchArea: Node | null = null;

    private startPos: Vec3 = new Vec3();
    public _touchStart: boolean = false;

    public _jumpStart: boolean = false;

    public _rollingStart: boolean = false;
    public axis: Vec3=new Vec3();



    private buttonActions: { [key: string]: Function } = {};

    onEnable() {

        //键盘输入
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);


        //触屏输入
        if (this.touchArea) {
            this.touchArea.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
            this.touchArea.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.touchArea.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
            this.touchArea.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }
        //  this._jumpStart = true;
        this.buttons.forEach(button => {
            const buttonComponent = button.getComponent(Button);
            if (buttonComponent) {
                buttonComponent.node.on(Button.EventType.CLICK, () => this.onButtonClick(button.name), this);
            }
        });

        // 设置初始的按钮事件
        this.buttonActions['ButtonA'] = () => this.onButtonAClick();
        this.buttonActions['ButtonB'] = () => this.onButtonBClick();
        // this.setButtonAction('ButtonA', this.onButtonAClick);
        //  this.setButtonAction('ButtonB', this.onButtonBClick);
    }

    start() { }

    onDisable() {


        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        if (this.touchArea) {
            this.touchArea.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
            this.touchArea.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.touchArea.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
            this.touchArea.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }

        this.buttons.forEach(button => {
            const buttonComponent = button.getComponent(Button);
            if (buttonComponent) {
                buttonComponent.node.off(Button.EventType.CLICK, () => this.onButtonClick(button.name), this);
            }
        });
    }

    private onTouchStart(event: EventTouch) {
        const uiLocation = event.getUILocation();
        this.startPos.set(uiLocation.x, uiLocation.y, 0);
        const localPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(this.startPos);
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
        this.axis = new Vec3();
        this.joystickHandle.setPosition(new Vec3(0, 0, 0)); // 重置手柄位置
        this._touchStart = false;
    }

    private onButtonClick(buttonName: string) {

        // console.log(`${buttonName} clicked`);
        if (this.buttonActions[buttonName]) {
            this.buttonActions[buttonName]();
        }
    }

    public setButtonAction(buttonName: string, action: Function) {
        this.buttonActions[buttonName] = action;
    }

    private onButtonAClick() {

        this._jumpStart = true;
        // console.log(this._jumpStart);

    }

    private onButtonBClick() {
        this._rollingStart = true;
    }


    //键盘输入

    private onKeyDown(event: EventKeyboard) {
        let direction = new Vec3();
        
        
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                direction.y = 1;
                this._touchStart = true;
                break;
            case KeyCode.KEY_S:
                direction.y = -1;
                this._touchStart = true;
                break;
            case KeyCode.KEY_A:
                direction.x = -1;
                this._touchStart = true;
                break;
            case KeyCode.KEY_D:
                this._touchStart = true;
                direction.x = 1;
                break;

            
       
        }
        
        this.normalizeDirection(direction);
    }

    private onKeyUp(event: EventKeyboard) {
        this._touchStart = false;
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_S:
                this.axis.y = 0;
                break;
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:
                this.axis.x = 0;
                break;
            
        }
        
    }
    private normalizeDirection(dir:Vec3) {
        if (dir.length() > 0) {
            
            dir.normalize();
            
            this.axis = dir;

        }
        

    }
    update(deltaTime: number) {
        
    }

    get XisAbsoluteValueLess(): boolean {
        const threshold = Math.pow(10, -2);
     //   console.log(Math.abs(this.axis.x));
        return Math.abs(this.axis.x) < threshold;
    }
}
