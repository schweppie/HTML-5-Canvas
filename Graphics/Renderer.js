class Renderer
{
    ClearScreen()
    {
        this.canvas.ClearColor(this.clearColor);
    }

    FadeScreen()
    {
        this.canvas.Fade(0.95, this.clearColor);
    }

    constructor(canvas)
    {
        this.canvas = canvas;
        this.clearColor = new RGB(20,10,30);
        this.number = 0;

        this.onRenderHandlers = [];

        this.onRenderUiHandlers = [];
        this.onRenderTextHandlers = [];

        this.canvas.ReadImageData();
        this.canvas.ClearColor(this.clearColor);
    }

    AddOnRenderHandler(handler)
    {
        this.onRenderHandlers.push(handler);
    }

    AddOnRenderUiHandler(handler)
    {
        this.onRenderUiHandlers.push(handler);
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
        this.FadeScreen();

        this.DispatchOnRenderHandlers(this.onRenderHandlers);
        this.DispatchOnRenderHandlers(this.onRenderUiHandlers);

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
