import {PianoChairScene} from "./Scene/pianochairscene.js";

window.onload = main();

function main() {
    let canvas = document.getElementById('myCanvas');
    let scene = new PianoChairScene(canvas);

    scene.start();
    animate();
    
    document.addEventListener("keydown", onKeyDown);

    function animate() {
        scene.animate()
        requestAnimationFrame(animate);
    }

    function onKeyDown(event) {
        scene._onKeyDown(event)
    }
}
