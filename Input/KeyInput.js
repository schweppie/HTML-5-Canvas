class KeyInput
{
    constructor(canvas)
    {
        document.addEventListener('keydown', this.OnKeyDown.bind(this));
        document.addEventListener('keyup', this.OnKeyUp.bind(this));

        this.onDownHandlers = [];
        this.onUpHandlers = [];
    }

    AddOnKeyDown(handler)
    {
        this.onDownHandlers.push(handler);
    }

    AddOnKeyUp(handler)
    {
        this.onUpHandlers.push(handler);
    }

    DispatchHandlers(handlers)
    {
        for (let i = 0; i < handlers.length; i++)
        {
            handlers[i]();
        }
    }

    OnKeyDown(event)
    {
        this.DispatchHandlers(this.onDownHandlers);
    }

    OnKeyUp(event)
    {
        this.DispatchHandlers(this.onUpHandlers);
    }
}
