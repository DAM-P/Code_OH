import { _decorator, Component, Node, AudioClip, sys, director, AudioSource, Input, UITransform, log, ProgressBar, resources, SliderComponent } from 'cc';
import { GlobalSingleton } from './GlobalSingleton';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends GlobalSingleton {

    ctrl: boolean = false;
    public static getInstance(): AudioManager {
        return <AudioManager>super.getInstance();
    }
    @property(AudioSource)
    audiosource: AudioSource = null; // 背景音乐音频剪辑

    @property(Number)
    private volume: number = 0.5; // 默认音量

    @property(SliderComponent)
    volumeBar: SliderComponent = null; // 音量进度条


    onEnable(): void {
        super.onEnable();
    }

    start(): void {
        if (this.ctrl == true) { this.init(); }

        this.audiosource = this.node.getComponent(AudioSource);
        this.audiosource.playOnAwake = true;
        resources.load('Audio/bgm', AudioClip, (err, audio) => {
            if (err) {
                log(err);
                return;
            }
            this.audiosource.clip = audio;
            this.audiosource.play();
        });

    }
    public playBGM() {
        this.audiosource.play();
    }

    // 停止背景音乐
    public stopBGM() {
        this.audiosource.stop();
    }

    // 初始化音量设置
    public init() {
        const savedVolume = this.node.getComponent(AudioSource).volume;
        this.initVolumeControl();
    }
    initVolumeControl() {
        this.volumeBar.progress = this.volume; // 设置 Slider 初始值
        // 监听 Slider 的值变化
        this.volumeBar.node.on('slide', this.onSliderChange, this);
    }
    onSliderChange() {
        // 获取当前 Slider 的值
        const volume = this.volumeBar.progress;
        this.audiosource.volume = volume; // 设置 AudioSource 的音量
    }



}


