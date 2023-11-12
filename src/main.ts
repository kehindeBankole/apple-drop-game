import './style.css';
import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  player!: Phaser.Physics.Arcade.Image;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  apple!: Phaser.Physics.Arcade.Image;
  scoreText: any;
  score: number;
  timeRemaining: any;

  constructor() {
    super('scene-game');
    this.player;
    this.cursors;
    this.score = 0;
    this.timeRemaining = 0;
  }

  preload() {
    this.load.image('bg', '/assets/bg.png');
    this.load.image('basket', '/assets/basket.png');
    this.load.image('apple', 'assets/apple.png');
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0, 0);
    this.player = this.physics.add.image(60, 450, 'basket');
    this.player.setCollideWorldBounds(true);
    this.apple = this.physics.add
      .image(0, 0, 'apple')
      .setBounce(0.2)
      .setOrigin(0, 0)
      .setMaxVelocity(0, 300);

    this.physics.add.overlap(
      this.apple,
      this.player,
      this.collectStar,
      null,
      this
    );
    this.cursors = this.input.keyboard?.createCursorKeys()!;

    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: 'blue',
    });
    this.add.text(350, 16, 'Time: 0', {
      fontSize: '32px',
      color: 'blue',
    });
  }

  update() {
    // Math.floor(Math.random() * 400);
    if (this.apple.y >= 450) {
      console.log(this.apple.y);
      this.apple.setY(0);
      this.apple.setX(Math.floor(Math.random() * 400));
    }

    const { left, right } = this.cursors;
    if (left.isDown) {
      this.player.setVelocityX(-150);
    } else if (right.isDown) {
      this.player.setVelocityX(150);
    } else {
      this.player.setVelocityX(0);
    }
  }

  collectStar() {
    this.apple.setY(0);
    this.apple.setX(Math.floor(Math.random() * 400));
    console.log('sjjs');
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
  }
}
const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
