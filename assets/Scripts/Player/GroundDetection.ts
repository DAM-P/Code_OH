import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, Layers, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GroundDetection')
export class GroundDetection extends Component {
    public _isGrounded: boolean = false;


    private GDposition: Vec3 = new Vec3(0, -20, 0);


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

       //console.log(otherCollider.node.layer);
        if (otherCollider.node.layer == 1073741824 ) {
            this._isGrounded = true;
           // console.log('Grounded');
        }
    }

    private onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        if (otherCollider.node.layer == 1073741824) {
            this._isGrounded = false;
            //console.log('Not grounded');
        }
    }


    public isGrounded(): boolean {
        return this._isGrounded;
    }

    update(dt: number) {
        this.node.setPosition(this.GDposition);
    }
}
