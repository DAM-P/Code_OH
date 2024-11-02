import { _decorator, Component, Node } from 'cc';
import { Door } from './Door';
const { ccclass, property } = _decorator;

@ccclass('DoorController')
export class DoorController extends Component {
    @property({ type: [Node], tooltip: '对应的门对象' })
    doors: Node[] = []; // 控制多个门对象

    @property({ type: [Node], tooltip: '对应的开关对象' })
    switches: Node[] = []; // 控制多个开关对象

    start() {
        if (this.switches.length !== this.doors.length) {
            console.error('开关和门的数量不匹配！');
            return;
        }

        for (let i = 0; i < this.switches.length; i++) {
            const switchNode = this.switches[i];
            const doorNode = this.doors[i];

            switchNode.on('toggle', () => {
                const doorComponent = doorNode.getComponent(Door);
                if (doorComponent) {
                    doorComponent.toggleDoor();
                }
            }, this);
        }
    }
}
