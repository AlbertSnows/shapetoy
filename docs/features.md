# Feature requests

remarks on the implications of various features

## local storage based persistence

What are we storing? The object data? I have the entire
canvas state stored in a SSoT. I also like to use maps, which
are essentially the fundamental definition of relationships.
Maps are a good use case for relational tables, so it should
be reasonablly easy to store this data in something like
postgres. Stuff like mongo should also be perfectly usable.

## undo/redo

This is an interesting problem. I think making stuff more
immutable will make this easier. To be specific, which actions
and commands can we undo/redo? My suspicion is stuff like
editing properties, moving shapes, and so on. To do this, after
every event completes, we can save a snapshot of the state
(or, more precariously, the specific data that was changed)
of the application in memory. There should be a time-based
data structure, T, we can use to store the data, and then we can ask questions about how our app relates to T at any given time for
restoration purposes.

## save to image

There's a bunch of discussion about this online, and the
canvas API seems to have an in: <https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL>

## Additional changes I'd like to make

Composition, mainly. The code design is fairly ad hoc, and there are a
few places that could be refined and abstracted to clean up the design.
For example, I think the event handling file should have little to
no actual functionality. It should just list the event listeners
and which functions are attached to them. Other functions could be
composed better, and so on. I'd also like to use rambda rather than
coming up with my own cobbled solutions to these problems.

//todo: linke rambda...