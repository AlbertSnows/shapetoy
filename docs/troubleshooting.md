
# Troubleshooting

## JS doesn't show up for scripts labeled module

has something to do with CQRS thing maybe? I gave up, don't use module.

## "module" was a bare specifier

below is wrong, the reason is unknown, but for now I've just added
src scripts in the html.

Never  figured out the cause, but seems to be related to a static serve.
Instead of serving from a static index.html file where we add the script, we
should serve the file via express

## disallowed mime type

make sure when you import a JS file it ends in '.js'