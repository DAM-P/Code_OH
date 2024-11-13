import { _decorator, Component, Node, Vec3, input, Input, KeyCode, EventKeyboard } from 'cc';
import { Enemy } from './Enemy'; // 假设 Enemy 类在同一目录下
import { EnemyManager } from './EnemyManager'; // 假设 EnemyManager 在同一目录下
const { ccclass, property } = _decorator;

@ccclass('AttackZombie')
export class AttackZombie extends Enemy {
    @property(Node)
    player: Node = null; // 玩家节点

    @property
    attackDistance: number = 5; // 攻击距离

    @property
    attackPreDelay: number = 0.5; // 前摇时间，单位为秒

    @property
    attackDuration: number = 1; // 攻击时间，单位为秒

    @property
    attackPostDelay: number = 0.5; // 后摇时间，单位为秒

    @property(Node)
    respawnPoint: Node = null; // 复活点

    @property
    walkSpeed: number = 2; // 行走速度

    @property
    walkRangeMin: number = -10; // 行走范围最小值

    @property
    walkRangeMax: number = 10; // 行走范围最大值

    private isAttacking: boolean = false;
    private direction: number = 1; // 1 表示向右，-1 表示向左

    start() {
        this.respawnPosition.set(this.respawnPoint.position); 
    }

    update(deltaTime: number) {
        if (this.player) {
            const distance = Vec3.distance(this.node.position, this.player.position);
            if (distance <= this.attackDistance && !this.isAttacking) {
                this.attack();
            } else {
                this.walk(deltaTime);
            }
        } else {
            this.walk(deltaTime);
        }
    }

    async attack() {
        this.isAttacking = true;
        console.log('攻击前摇');
        await this.delay(this.attackPreDelay);

        console.log('攻击中');
        await this.delay(this.attackDuration);

        console.log('攻击后摇');
        await this.delay(this.attackPostDelay);

        this.isAttacking = false;
    }

    delay(seconds: number) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    die() {
        this.node.active = false; // 先将节点设为不活跃
        this.respawnAtPoint(this.respawnPosition);
    }

    async respawnAtPoint(point: Vec3) {
        await EnemyManager.respawnZombie(this.node, point, this.respawnDelay);
    }

    walk(deltaTime: number) {
        const displacement = this.walkSpeed * deltaTime * this.direction;
        this.node.setPosition(this.node.position.x + displacement, this.node.position.y, this.node.position.z);

        // 如果到达行走范围的边界，改变方向
        if (this.node.position.x > this.walkRangeMax) {
            this.direction = -1; // 向左
        } else if (this.node.position.x < this.walkRangeMin) {
            this.direction = 1; // 向右
        }
    }
}