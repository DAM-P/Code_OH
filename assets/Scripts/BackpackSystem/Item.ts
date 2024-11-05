import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Item')
export class Item extends Component {
    @property
    itemName: string = '';

    @property
    itemID: number = 0;

    @property(SpriteFrame) 
    itemIcon: SpriteFrame = null;// 图标路径

    @property
    itemCount: number = 1; 

    @property
    itemDescription: string = '';
    constructor(itemName: string, itemID: number, itemIcon: SpriteFrame, itemCount: number,itemDescription: string) {
        super();
        this.itemName = itemName;
        this.itemID = itemID;
        this.itemIcon = itemIcon;
        this.itemCount = itemCount;
        this.itemDescription=itemDescription;
    }
}
 