import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;




@ccclass('CharacterData')

export class CharacterData extends Component {
   // @property({ type: CharacterType })
  //  characterType: CharacterType = CharacterType.HERO;
    
    @property
    maxHealth: number = 100;

    @property
    health: number = 100;

    @property
    attackDamage: number = 10;

    @property
    defense: number = 0;

    @property
    speed: number = 5;

}


