
let hue = 0;

let xcenter, ycenter;
let xspeed = 0.6; // Speed of the shape
let yspeed = 0.5; // Speed of the shape
let segLength = 50;

let radius = 50;
let angle = 0;
let speed = 0.02;

let xdirection = 1; // Left or Right
let ydirection = 1; // Top to Bottom

let particles = [];
let cnv;

let cen;

function setup(){
    cnv = createCanvas(1600, 800);
    cnv.parent('myContainer');
    colorMode(HSB,255);
    //noStroke();

    xcenter = random(100, 1600) / 2;
    ycenter = random(100, 800) / 2;
    cen = createVector(xcenter, ycenter);

    // this generates three particles
    for(let i = 0; i < 270; i+=90){
        particles.push(new Particle(i));
    }

    background(0);
}

function draw(){
    fill(hue, 255, 255);

    // for debuging purposes
    //ellipse(cen.x, cen.y, 5, 5);

    if(mouseX > 0 && mouseX < 1600 && mouseY > 0 && mouseY < 800){
        for(let i = 0; i < particles.length; i++){
            particles[i].update2();
            particles[i].show();
        }
    } else{
        // update all of the particles
        for(let i = 0; i < particles.length; i++){
            particles[i].update();
            particles[i].show();
        }
    }
}

// pause drawing machine by pressing 'p' and 'r' to resume
function keyTyped() { 
    if (key == 'p') 
        noLoop();
    if (key == 'r')
        loop();
    if (key == 'x')
        background(0);
    if (key == 's')
        saveCanvas(cnv, 'myCanvas', 'png');
    if (key == 'i')
        radius+=1;
    if (key == 'd')
        radius-=1;
} 

function Particle(angle){

    this.x; 
    this.y;

    this.update = function(){
        // Update the position of center of circular motion
        cen.x = cen.x + xspeed * xdirection;
        cen.y = cen.y + yspeed * ydirection;

        // Test to see if the shape exceeds the boundaries of the screen
        // If it does, reverse its direction by multiplying by -1
        if (cen.x > width - radius || cen.x < radius) {
            xdirection *= -1;
        }
        if (cen.y > height - radius || cen.y < radius) {
            ydirection *= -1;
        }

        this.x = cen.x + radius * cos(angle);
        this.y = cen.y + radius * sin(angle);
    }

    // this function tells particles to move towards cursor
    this.update2 = function(){
        // move center of object move towards mouse
        var target = createVector(mouseX, mouseY);
        var distance = target.dist(cen);
        var mappedDist = map(distance, 100, 0, 1, 1);

        target.sub(cen);
        target.normalize();
        target.mult(mappedDist);

        cen.add(target);

        this.x = cen.x + radius * cos(angle);
        this.y = cen.y + radius * sin(angle);
    }

    this.show = function(){

        ellipse(cen.x, cen.y, 5, 5);
        ellipse(this.x, this.y, 12, 12);
        angle = angle + speed;
        // change hue of the circle
        hue += 2;
        if (hue > 255) hue = 0;
        
    }
}