import { _decorator, Component, director, log, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GlobalSingleton')
export class GlobalSingleton extends Component {
    private static _instance: GlobalSingleton = null;

    @property
    public someGlobalValue: number = 0; // 示例全局变量

    // 私有构造函数，防止外部实例化
    public constructor() {
        super();
    }

    // 获取单例实例的方法
    public static getInstance(): GlobalSingleton {
        return this._instance;
    }

    onEnable() {
        if (!GlobalSingleton._instance) {
            GlobalSingleton._instance = this;
            director.addPersistRootNode(this.node);
        } else {
            // 如果已经有实例，则销毁当前实例的节点
            this.node.destroy();
     
     
        }
        log('GlobalSingleton onEnable');
    }


}