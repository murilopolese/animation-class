# Animation Classes

Learning animation using code (p5js) as tool.

I'm using the [12 principles of animation](https://www.youtube.com/watch?v=haa7n3UGyDc&list=PL-bOh8btec4CXd2ya1NmSKpi92U_l6ZJd) series on Youtube to guide me:

- [Squash and stretch](https://editor.p5js.org/murilopolese/sketches/HzmXwntk2)
- Anticipation
- Staging
- Straight ahead & Pose to pose
- Follow through & Overlaping action
- Slow in & Slow out
- Arcs
- Secondary actions
- Timing
- Exaggeration
- Solid drawing
- Appeal

## Using Beziers to animate

Although using Physics engines or physical concepts such as velocity and vectors is my favourite way to think about animation, sometimes creating some specific, not so natural, types of movement sometimes is not ideal. If I want to watch an animation class for example, it's unlikely animators will talk in Physics terms. They do talk about curves, though. So for most of the motion and interpolation I'll use `bezierPoint` instead of physics models.

## Timeline

For simple, symmetric loops, one bezier and a simple strategy to loop through it will create the desired result. For more complex sequence of movements or to perfectly translate an animation designed in an animation software, it's useful to think of "timelines".

Think of it as an array of frames slots and you can place "keyframes" on them. The keyframe holds a value and two vectors to be used as control points for a bezier. If a frame doesn't have a "keyframe", it calculates its value interpolating the value from the previous "keyframe" to the next.

I'm creating one "timeline" for each value I want to animate and this gives the same power as if I was working with an animation software. The "timeline" can be used both for "value graphs" as well as "velocity graphs".

[Here's an example of a bouncing ball using beziers and "timelines"](https://editor.p5js.org/murilopolese/sketches/HzmXwntk2)

## Using/Translating from other animation software

With beziers and timelines I basically have all the tools necessary to implement animations and add interactivity to them but to design and experiment with the 12 principles of animation I'm using a range of different software, preferably Free and Open Source Software but not only.

Here are a few software I am using:

- [Synfig Studio Development Snapshot](https://www.synfig.org/) (FOSS)
- [TIC80](https://tic.computer/) (FOSS)
- [Piskel](https://www.piskelapp.com/) (Browser)
- [Loom](https://apps.apple.com/us/app/looom/id1454153126) (iPad)
