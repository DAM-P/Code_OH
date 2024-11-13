import { _decorator, Component, Node, Prefab, Vec3, input, Input, KeyCode, EventKeyboard } from 'cc';
import { Enemy } from './Enemy';
import { EnemyManager } from './EnemyManager'; 
const { ccclass, property } = _decorator;

@ccclass('Zombie')
export class Zombie extends Enemy {


    start() {
        this.respawnPosition.set(this.node.position); 
        
    }


    died() {
        // 处理敌人死亡逻辑
        this.respawnPosition.set(this.node.position); // 记录当前位置
        this.node.active = false; // 先将节点设为不活跃
      //  EnemyPoolManager.putEnemy(this.node); // 将节点放回对象池
        this.respawn();
        // 调用复活方法
       
    }

    async respawn() {
        
        // 调用复活方法，并等待复活完成
        await EnemyManager.respawnZombie(this.node, this.respawnPosition, this.respawnDelay);
       
    }
}