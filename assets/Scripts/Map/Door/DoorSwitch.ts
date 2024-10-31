import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { DoorController } from './DoorController';
import { PlayerInput } from '../../Input/Input';
import { PlayerController } from '../../Player/PlayerController';

const { ccclass, property } = _decorator;

@ccclass('DoorSwitch')
export class DoorSwitch extends Component {
    
    private player: any = null;

    onEnable() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    onDisable() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        const tryToGet = otherCollider.node.getComponent(PlayerController);
        
        if (tryToGet) {
            this.player = tryToGet;
        }
    }

    private onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        const playerNode = otherCollider.node;
        if (playerNode) {
            this.player= null;
        }
    }

    update(deltaTime: number) {

        if (this.player) {
            
        }
        if (this.player && this.player.input._actStart) {
            
            this.node.emit('toggle');
            this.player.input._actStart = false;
        }
    }
}

   

