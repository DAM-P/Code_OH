import { _decorator, Component, Node, instantiate, Prefab, Vec3 } from 'cc';
import { CharacterData } from '../Common/CharacterData'; // 导入 CharacterData 类
import { EnemyManager } from './EnemyManager'; // 导入对象池管理类
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property
    maxHealth: number = 100;

    @property
    attackDamage: number = 10;

    @property
    respawnDelay: number = 2;


    protected respawnPosition: Vec3 = new Vec3();
    private characterData: CharacterData = new CharacterData(); 

    start() {
        this.characterData.maxHealth = this.maxHealth;
        this.characterData.health = this.maxHealth;
        this.characterData.attackDamage = this.attackDamage;
   
    }

    update(deltaTime: number) {
      
    }

    takeDamage(amount: number) {
        this.characterData.health -= amount;
    }

   
  
}