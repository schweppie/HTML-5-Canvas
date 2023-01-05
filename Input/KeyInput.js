class KeyInput
{
    constructor(canvas)
    {
        document.addEventListener('keydown', this.OnKeyDown.bind(this));
        document.addEventListener('keyup', this.OnKeyUp.bind(this));

        window.requestAnimationFrame(this.HandleKeyboard.bind(this));
        
        this.onDownHandlers = [];
        this.onUpHandlers = [];
        this.onPressedHandlers = [];
        
        this.pressedKeys = [];       
    }
    
    HandleKeyboard()
    {
        for (let i = 0; i < this.pressedKeys.length; i++)
        {
            this.DispatchHandlers(this.onPressedHandlers, this.pressedKeys[i]);        
        }
        
        window.requestAnimationFrame(this.HandleKeyboard.bind(this));
    }

    AddOnKeyPressedHandler(handler)
    {
        this.onPressedHandlers.push(handler);
    }
    
    AddOnKeyDownHandler(handler)
    {
        this.onDownHandlers.push(handler);
    }

    AddOnKeyDownHandler(handler)
    {
        this.onUpHandlers.push(handler);
    }

    DispatchHandlers(handlers, keycode)
    {
        for (let i = 0; i < handlers.length; i++)
        {
            handlers[i](keycode);
        }
    }

    OnKeyDown(event)
    {
        this.DispatchHandlers(this.onDownHandlers, event.keyCode);
        
        if (!this.pressedKeys.includes(event.keyCode))
            this.pressedKeys.push(event.keyCode);
    }

    OnKeyUp(event)
    {
        if (this.pressedKeys.includes(event.keyCode))
        {
            let index = this.pressedKeys.indexOf(event.keyCode);
            this.pressedKeys.splice(index, 1);
        }
        
        this.DispatchHandlers(this.onUpHandlers, event.keyCode);
    }
}
