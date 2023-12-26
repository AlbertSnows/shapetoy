
# Troubleshooting

## JS doesn't show up for scripts labeled module

has something to do with CQRS thing maybe? I gave up, don't use module.

## "module" was a bare specifier

Never  figured out the cause, but seems to be related to a static serve.
Instead of serving from a static index.html file where we add the script, we
should serve the file via express