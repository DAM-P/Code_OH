import { _decorator, Component, Node } from 'cc';
import { Door } from './Door';
const { ccclass, property } = _decorator;

@ccclass('DoorController')
export class DoorController extends Component {
    @property({ type: [Node], tooltip: '��Ӧ���Ŷ���' })
    doors: Node[] = []; // ���ƶ���Ŷ���

    @property({ type: [Node], tooltip: '��Ӧ�Ŀ��ض���' })
    switches: Node[] = []; // ���ƶ�����ض���

    start() {
        if (this.switches.length !== this.doors.length) {
            console.error('���غ��ŵ�������ƥ�䣡');
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
