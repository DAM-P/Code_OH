import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GlobalSinglton')
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
        if (!this._instance) {
            // 创建并初始化实例
            this._instance = new GlobalSingleton();
            director.addPersistRootNode(this._instance.node);
        }
        return this._instance;
    }


}


