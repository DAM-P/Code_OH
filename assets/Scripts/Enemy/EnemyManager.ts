import { _decorator, Component, Node, NodePool, Prefab, instantiate, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {



    static async respawnZombie(enemyPrefab: Node, position: Vec3, delay: number): Promise<Node> {
        // 等待指定的延迟时间
        
        await new Promise(resolve => setTimeout(resolve, delay * 1000));
        
        const enemyNode = enemyPrefab;
        
        enemyNode.active = true; // 确保敌人节点是激活状态
        console.log(position);
        enemyNode.setPosition(position);
        return enemyNode;
    }
}