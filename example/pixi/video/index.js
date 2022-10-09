import * as PIXI from 'pixi.js'

function main () {
    const app = new PIXI.Application({ transparent: true })
    document.body.appendChild(app.view)

    const button = new PIXI.Graphics()
        .beginFill(0x0, 0.5)
        .drawRoundedRect(0, 0, 100, 100, 10)
        .endFill()
        .beginFill(0xffffff)
        .moveTo(36, 30)
        .lineTo(36, 70)
        .lineTo(70, 50);


    button.x = (app.screen.width - button.width) / 2;
    button.y = (app.screen.height - button.height) / 2;
    console.log(app.view)
    // Enable interactivity on the button
    button.interactive = true;
    button.buttonMode = true;

// Add to the stage
    app.stage.addChild(button);

    button.on('pointertap', onPlayVideo);

    function onPlayVideo() {
        // Don't need the button anymore
        button.destroy();

        // create a video texture from a path
        // https://pixijs.io/examples/examples/assets/video.mp4
        //
        const texture = PIXI.Texture.from('http://qliveplay.ugoshop.com/live/1664434554.m3u8');

        // create a new Sprite using the video texture (yes it's that easy)
        const videoSprite = new PIXI.Sprite(texture);

        // Stetch the fullscreen
        videoSprite.width = app.screen.width;
        videoSprite.height = app.screen.height;

        app.stage.addChild(videoSprite);
    }

}
main()