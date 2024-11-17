import { _decorator, Component, Node, SpriteFrame, SpriteRenderer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Item')
export class Item extends Component {
    @property(String)
    itemName: string = '';

    @property(Number)
    itemID: number = 0;

    @property(SpriteFrame)
    itemIcon: SpriteFrame = null;// 图标路径

    @property(Number)
    itemCount: number = 1;

    @property(String)
    itemDescription: string = '';
    constructor(itemName: string, itemID: number, itemIcon: SpriteFrame, itemCount: number, itemDescription: string) {
        super();
        this.itemName = itemName;
        this.itemID = itemID;
        this.itemIcon = itemIcon;
        this.itemCount = itemCount;
        this.itemDescription = itemDescription;
    }
    protected start(): void {
        this.node.getComponent(SpriteRenderer).spriteFrame = this.itemIcon;
    }
}
