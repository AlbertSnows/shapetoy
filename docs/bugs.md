# Missing Features / Notable Bugs

This is a list of bugs or missing features that are notably asked for by 
the instructions that are missing. I'll provide brief explinations of why.

## Semi-transparent blue border

The current border is just blue. I could probably change this without
much trouble, but the dark blue color was easier to see. Consider this an
accessibility feature!

## Only one shape can be selected at a time

This works mechanically, but not always visibly. If two shapes overlap, you'll
see both of them have the blue border. This is probably a hassle to fix, so
I decided not to. I suspect the  feature is a matter of checking if the cursor
is outside the range of whatever highlighted shapes were previously highlighted.

## Clicking shapes gives a white boarder

I don't have an easy fix for this one. The only way to clear the canvas
is with the rectangle shape as far as I know. So for any non-rectangle shapes,
clearing the board is tedious. With that said, I don't know why the white 
border stays around the circle after I do the clear. Figuring that out would
be the first step in fixing that bug. 

## circle 1 becomes the color of circle n - 1 afte 3+ circles

No commentary on this since I only just learned about it, but
it's good to document.
