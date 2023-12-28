# Future considerations

possible design considerations for further implementation

## Future feature requests?

This feature is buggy, but not unstable. It's relatively
lightweight and reasonably organized so I don't think 
adding additional features would be too troublesome. As
with all things in life, it depends. 

## Bottlenecks?

This question is why I choose the quad tree. Had I not used
the quadtree, I would have either had to look through
the entire object set everytime the canvas needed to do
an update (which happens frequently) or I would have had
to come up with my own hashing algorithm to map the coords
of an event object to its corresponding object in memory.
To my knowledge, there is no easy way to further meaningfully
increase the speed with respect to scalability because canvas
doesn't keep track of the objects you draw. 

Additionally, canvas does not have as many feature as it
may seem. Once you need behavior more complex than simple shapes, the limitations become apparent. Even with circles,
I ran into problems erasing the canvas. Currently it can
only erase rectangular sections which is unfortunate. Again,
aside from enhancments to the API, I don't know of any 
meaningful ways to surpass these bottlenecks. 

