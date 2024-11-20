import { _decorator, director, Component, Node } from 'cc';
import { GlobalSingleton } from '../UI/GlobalSingleton';
const { ccclass, property } = _decorator;

@ccclass('GameLoop')
export class GameLoop extends GlobalSingleton {
    // 游戏是否暂停
    private _isPaused: boolean = false;
    // 获取单例实例
    public static getInstance(): GameLoop {
        return <GameLoop>super.getInstance(); // 使用父类的 getInstance 方法
    }

    // 暂停游戏
    public pauseGame() {
        if (this.isPaused()) return;
        this._isPaused = true;
        director.pause();
    }

    // 恢复游戏
    public resumeGame() {
        if (!this.isPaused()) return;
        this._isPaused = false;
        director.resume();
    }

    // 游戏是否暂停
    public isPaused(): boolean {
        return this._isPaused;
    }

    // 游戏主循环
    protected update(dt: number) {
        if (!this._isPaused) {
         
        }
    }
}


