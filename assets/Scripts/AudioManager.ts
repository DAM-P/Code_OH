import { _decorator, Component, Node, AudioClip, sys,  } from 'cc';
import { GlobalSingleton } from './UI/GlobalSingleton';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends GlobalSingleton {
    public static getInstance(): AudioManager {
        return <AudioManager>super.getInstance();
    }
    @property(AudioClip)
    bgmClip: AudioClip = null; // 背景音乐音频剪辑

    private currentBGMId: number = 0; // 当前播放的背景音乐ID
    private volume: number = 0.5; // 默认音量
    public setVolume(volume: number) {
        this.volume = volume;
    //    audioEngine.setMusicVolume(volume); // 设置背景音乐音量
    //     a.setEffectsVolume(volume); // 设置音效音量
     sys.  localStorage.setItem('volume', volume.toString()); // 保存音量设置
    }
    public playBGM() {
        if (this.bgmClip) {
            // this.currentBGMId = cc.audioEngine.play(this.bgmClip, true, this.volume);
        }
    }

    // 停止背景音乐
    public stopBGM() {
        // director.stop(this.currentBGMId);
    }

    // 播放音效
    public playEffect(effectClip:AudioClip) {
        if (effectClip) {
            // cc.audioEngine.playEffect(effectClip, false);
        }
    }

    // 初始化音量设置
    public init() {
        const savedVolume = sys.localStorage.getItem('volume');
        if (savedVolume) {
            this.setVolume(parseFloat(savedVolume));
        } else {
            this.setVolume(0.5); // 默认音量
        }
    }
}


