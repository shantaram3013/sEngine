function init() {
    canvas = document.querySelector('canvas');
    renderer = canvas.getContext("2d");
    canvas.width = window.innerWidth - window.innerWidth % World.tileSize;
    canvas.height = window.innerHeight - window.innerHeight % World.tileSize;

    addEventListener('mousemove', event => {
        mouse.x = event.clientX - (innerWidth - canvas.width);
        mouse.y = event.clientY - (innerHeight - canvas.height);
    });
    
    addEventListener('resize', () => {
        init();
    });
    
    addEventListener('keypress', () => {
        var keyCode = event.keyCode;
    
        if(keyCode == 119) {
            player.move(Directions.UP);
        }
    
        if(keyCode == 115) {
            player.move(Directions.DOWN);
        }
    
        if(keyCode == 97) {
            player.move(Directions.LEFT);
        }
    
        
        if(keyCode == 100) {
            player.move(Directions.RIGHT);
        }
    
        
    });

    var rightMouseClicked = false;

    function handleMouseDown(e) {
    //e.button describes the mouse button that was clicked
    // 0 is left, 1 is middle, 2 is right
        if (e.button === 2) {
            rightMouseClicked = true;
            player.ranged();
        }
        
        else if (e.button === 0) {
            //Do something if left button was clicked and right button is still pressed
            if (rightMouseClicked) {
                console.log('hello');
            }

            else {
                // player.melee();
            }
        }
    }

    function handleMouseUp(e) {
        if (e.button === 2) {
            rightMouseClicked = false;
        }
    }

    addEventListener('mousedown', handleMouseDown);
    addEventListener('mouseup', handleMouseUp);
    addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    World.mapW = canvas.width / World.tileSize;
    World.mapH = canvas.height / World.tileSize;

    console.log("Initialised new canvas with width: " + canvas.width + " height: " + canvas.height + " map width: " + World.mapW + " map height: " + World.mapH);
    window.requestAnimationFrame(draw);
}