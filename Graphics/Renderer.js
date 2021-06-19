class Renderer
{
    ClearScreen()
    {
        this.canvas.Clear();
        this.canvas.ReadImageData();
        this.canvas.ClearColor(this.clearColor);
    }

    constructor(canvas)
    {
        this.canvas = canvas;
        this.clearColor = new RGB(20,10,30);
        this.number = 0;

        this.onRenderHandlers = [];
        this.onRenderTextHandlers = [];

        this.ClearScreen();
    }

    AddOnRenderHandler(handler)
    {
        this.onRenderHandlers.push(handler);
    }

    AddOnRenderTextHandler(handler)
    {
        this.onRenderTextHandlers.push(handler);
    }

    DispatchOnRenderHandlers(handlers)
    {
        for (let i = 0; i < handlers.length; i++)
        {
            handlers[i](this.canvas);
        }
    }

    Update()
    {
        this.ClearScreen();

        this.DispatchOnRenderHandlers(this.onRenderHandlers);

        this.RenderScreen();

        this.DispatchOnRenderHandlers(this.onRenderTextHandlers);

        window.requestAnimationFrame(this.Update.bind(this));
    }

    Start()
    {
        window.requestAnimationFrame(this.Update.bind(this));
        this.ClearScreen();
    }

    RenderScreen()
    {
        this.canvas.WriteImageData();
    }
}
