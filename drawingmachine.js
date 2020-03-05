
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
    cnv = createCanvas(800, 800);
    cnv.parent('myContainer');
    colorMode(HSB,255);
    //noStroke();

    xcenter = random(100, 700) / 2;
    ycenter = random(100, 700) / 2;
    cen = createVector(xcenter, ycenter);

    // this generates three particles
    for(let i = 0; i < 270; i+=90){
        particles.push(new Particle(i));
    }

}

function draw(){
    background(0);
    fill(hue, 255, 255);

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

    if (keyIsPressed && key == 'i') {
        radius+=2;
    } else if(keyIsPressed && key == 'd'){
        radius-=2;
    }
    
    // change hue of the circle
    hue += 2;
    if (hue > 255) hue = 0;
}

// pause drawing machine by pressing 'p' and 'r' to resume
function keyTyped() { 
    if (key == 'p') 
        noLoop();
    if (key == 'r')
        loop();
    if (key == 'x'){
        for(let i = 0; i< particles.length; i++){
            particles[i].clearTail();
        }
    }
    if (key == 's')
        saveCanvas(cnv, 'myCanvas', 'png');
}

function Particle(angle){

    this.tail = [];
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
        this.tail.push(createVector(this.x, this.y));
    }

    this.clearTail = function(){
        this.tail = [];
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
        this.tail.push(createVector(this.x, this.y));
    }

    this.show = function(){

        // uncomment for debuging
        //ellipse(cen.x, cen.y, 5, 5);

        // randomly giggles the particles
        for(let i = 0; i < this.tail.length; i++){
            ellipse(this.tail[i].x+=random(-0.6,0.6), this.tail[i].y+=random(-0.6,0.6), 12, 12);
        }

        //ellipse(this.x, this.y, 12, 12);
        angle = angle + speed;
        
    }
}