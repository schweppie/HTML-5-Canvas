class KeyInput
{
    constructor(canvas)
    {
        document.addEventListener('keydown', this.OnKeyDown.bind(this));
        document.addEventListener('keyup', this.OnKeyUp.bind(this));

        this.onDownHandlers = [];
        this.onUpHandlers = [];
    }

    AddOnKeyDownHandler(handler)
    {
        this.onDownHandlers.push(handler);
    }

    AddOnKeyDownHandler(handler)
    {
        this.onUpHandlers.push(handler);
    }

    DispatchHandlers(handlers, event)
    {
        console.log(event.keyCode);
        for (let i = 0; i < handlers.length; i++)
        {
            handlers[i](event.keyCode);
        }
    }

    OnKeyDown(event)
    {

        this.DispatchHandlers(this.onDownHandlers, event);
    }

    OnKeyUp(event)
    {
        this.DispatchHandlers(this.onUpHandlers, event);
    }
}
