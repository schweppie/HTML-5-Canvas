class MouseInput
{
    constructor(canvas)
    {
        console.log(canvas);

        canvas.addEventListener("mousemove", this.Move.bind(this));
        canvas.addEventListener("mousedown", this.Press.bind(this));
        canvas.addEventListener("mouseup", this.Release.bind(this));
        canvas.addEventListener("mouseout", this.Release.bind(this));

        this.pressed = false;

        this.onMoveHandlers = [];
        this.onDragHandlers = [];
        this.onClickHandlers = [];
        this.onReleaseHandlers = [];
    }

    AddOnMoveHandler(handler)
    {
        this.onMoveHandlers.push(handler);
    }

    AddOnDragHandler(handler)
    {
        this.onDragHandlers.push(handler);
    }

    AddOnClickHandler(handler)
    {
        this.onClickHandlers.push(handler);
    }

    AddOnReleaseHandler(handler)
    {
        this.onReleaseHandlers.push(handler);
    }

    DispatchXYHandlers(x, y, handlers)
    {
        for (let i = 0; i < handlers.length; i++)
        {
            handlers[i](x, y);
        }
    }

    Press(e)
    {
        this.pressed = true;
        this.DispatchXYHandlers(e.offsetX, e.offsetY, this.onClickHandlers);
    }

    Release(e)
    {
        this.pressed = false;
        this.DispatchXYHandlers(e.offsetX, e.offsetY, this.onReleaseHandlers);
    }

    Move(e)
    {
        this.DispatchXYHandlers(e.offsetX, e.offsetY, this.onMoveHandlers);

        if (this.pressed)
        {
            this.DispatchXYHandlers(e.offsetX, e.offsetY, this.onDragHandlers);
        }
    }
}
