import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Item } from './Item';
const { ccclass, property } = _decorator;

@ccclass('InventoryManager')
export class InventoryManager extends Component {
    @property([Item])
    items: Item[] = [];

    addItem(item: Item) {
        const existingItem = this.items.find(i => i.itemID === item.itemID);
        if (existingItem) {
            existingItem.itemCount += item.itemCount;
        } else {
            this.items.push(item);
        }
    }

    removeItem(itemID: number, count: number) {
        const item = this.items.find(i => i.itemID === itemID);
        if (item) {
            if (item.itemCount > count) {
                item.itemCount -= count;
            } else {
                const index = this.items.indexOf(item);
                this.items.splice(index, 1);
            }
        }
    }

    getItem(itemID: number): Item | undefined {
        return this.items.find(i => i.itemID === itemID);
    }
}
