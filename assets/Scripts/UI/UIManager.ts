import { _decorator, Component, director, log, Node } from 'cc';
import { GlobalSingleton } from './GlobalSingleton';
const { ccclass, property } = _decorator;

@ccclass
export class UIManager extends GlobalSingleton {
    @property([Node])
    private panels: Node[] = []; // 存储所有 UI 面板节点

    // 获取单例实例
    public static getInstance(): UIManager {
        return <UIManager>super.getInstance(); // 使用父类的 getInstance 方法
    }

    // 显示指定的面板
    public showPanel(panelName: string) {
        const panel = this.panels.find(p => p.name === panelName);
        if (panel) {
            panel.active = true;
            log(`显示面板: ${panelName}`);
        } else {
            log(`未找到面板: ${panelName}`);
        }
    }

    // 隐藏指定的面板
    public hidePanel(panelName: string) {
        const panel = this.panels.find(p => p.name === panelName);
        if (panel) {
            panel.active = false;
            log(`隐藏面板: ${panelName}`);
        } else {
            log(`未找到面板: ${panelName}`);
        }
    }

    // 初始化面板，设置所有面板为隐藏
    public initPanels() {
        this.panels.forEach(panel => {
            panel.active = false;
        });
    }
}