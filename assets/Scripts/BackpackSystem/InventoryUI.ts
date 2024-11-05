import { _decorator, Component, Node, Label, Sprite, Prefab, instantiate } from 'cc';
import { InventoryManager } from './InventoryManager';
import { Item } from './Item';
const { ccclass, property } = _decorator;

@ccclass('InventoryUI')
export class InventoryUI extends Component {
    @property(Node)
    inventoryPanel: Node = null;

    @property(Prefab)
    itemPrefab: Prefab = null;

    @property(InventoryManager)
    inventoryManager: InventoryManager = null;

    start() {
        this.refreshUI();
    }

    refreshUI() {
        this.inventoryPanel.removeAllChildren();
        this.inventoryManager.items.forEach(item => {
            const itemNode = instantiate(this.itemPrefab);
            const itemSprite = itemNode.getComponent(Sprite);
            const itemLabel = itemNode.getComponent(Label);

            itemSprite.spriteFrame =item.itemIcon; // 根据 itemIcon 设置图标
            itemLabel.string = `${item.itemName} (${item.itemCount})`;

            this.inventoryPanel.addChild(itemNode);
        });
    }
}
