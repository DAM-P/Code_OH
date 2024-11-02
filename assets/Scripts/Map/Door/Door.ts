import { _decorator, Component, Node, Collider2D, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Door')
export class Door extends Component {
    private _isOpen: boolean = false;

    @property(Collider2D)
    doorCollider: Collider2D = null;

    @property(Animation)
    doorAnimation: Animation = null;

    onEnable() {
        this.node.on('open', this.openDoor, this);
        this.node.on('close', this.closeDoor, this);
        this.node.on('toggle', this.toggleDoor, this);
    }

    onDisable() {
        this.node.off('open', this.openDoor, this);
        this.node.off('close', this.closeDoor, this);
        this.node.off('toggle', this.toggleDoor, this);
    }

    private openDoor() {
        if (!this._isOpen) {
            console.log('Opening door...');
            this._isOpen = true;
            this.doorCollider.enabled = false;
           // this.doorAnimation.play('open'); // 播放打开门的动画
        }
    }

    private closeDoor() {
        if (this._isOpen) {
            console.log('Closing door...');
            this._isOpen = false;
            //this.doorAnimation.play('close'); // 播放关闭门的动画

            // 动画播放完毕后启用碰撞体
            //this.doorAnimation.once(Animation.EventType.FINISHED, () => {
                this.doorCollider.enabled = true;
            //})
            ;
        }
    }

    public toggleDoor() {
        this._isOpen ? this.closeDoor() : this.openDoor();
    }
}
