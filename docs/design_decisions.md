# Design Decisions

Commentary on my various design decisions.

## Why JS?

I got the impressions that the intent was to use JS since we're
wanting to display this in HTML, and you link to the JS canvas
API, so that settles that one. You did say to use anyone, but it
feels like JS is almost made for this sort of project, so it 
was not a complicated decisions. 

## Frameworks?

No frameworks, this is all vanilla javascript. If I had more time,
and was a more experienced frontend engineer, I would have spent more
time looking into frontend libraries to help with the design. For
example, all of the files are accessed through an html-embedded
script directly. I swear there should be a better way to set up
frontend interop with the dom (and no, I don't thing the answer is always React...though it might be in this case), but since the project is so 
bare-bones, I opted not to look into it since I only had a few
days. HOWEVER, I did use the quadtree library because all research
on keeping track of canvas objects was worriesome. You can look
at that library here: <https://github.com/timohausmann/quadtree-ts/>. It's pretty neat.


## Code design?

Fast and loose. More musings below, but for now we're going
to keep it short in case you don't care about musings.
The key takeaway is to have a single source of truth, 
simple data structures, and to abstract towards function composition where possible. Also, maps are extremely powerful. My inspirations come from
clojure. 

Clojure: <https://clojure.org/>

## Code design musings

I like dynamic code because I can focus on implementation and instead of making the type system happy. With that said, I fixed a lot more minor bugs than the java project. However, the total time is lower since the bugs were mundane and easy to spot. And yet, there were enough gotcha's that frankly it's probably best to just use a type system 
over nothing.

I've talked about this with other friends and coworkers in the past, but I envision the future of
type safety heading toward schemas. It's the best of both worlds and to my knowledge has been best expressed in features and libraries such as malli,
various json schema validators, and C++'s new concepts and constraints. I'll share links below.

Malli: <https://github.com/metosin/malli>
Json Schema in java: <https://github.com/networknt/json-schema-validator>
C++ concepts talk: <https://youtu.be/_doRiQS4GS8> (42 mins in is interesting!)

Type disputes are frivolous anyways. In terms of
architecture, there isn't much. Most of the focus was on compartmentilization 
but on each iterative review of a given section of code I was able to abstract
my function design. Many files like `attach_events.js` were constantly being
redesigned and thus need TLC, but I'm happy with other files like `define/core.js` which generated the data structures since there's a lot more
composition going on. I also kept the canvas state at the top level, the
appeal of this is very loosely inpired by frameworks I've used in the past
like Fulcro, but it would be more accurate to say that maintaining a single
source of truth is a reliable software design concept in most cases.

Fulcro: <https://github.com/fulcrologic/fulcro>