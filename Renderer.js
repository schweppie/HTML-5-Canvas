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
        this.clearColor = new RGB(50,30,30);
        this.number = 0;

        this.onRenderHandlers = [];

        this.ClearScreen();
    }

    AddOnRenderHandler(handler)
    {
        this.onRenderHandlers.push(handler);
    }

    DispatchOnRenderHandlers()
    {
        for (let i = 0; i < this.onRenderHandlers.length; i++)
        {
            this.onRenderHandlers[i](this.canvas);
        }
    }

    Update()
    {
        this.ClearScreen();

        this.DispatchOnRenderHandlers();

        this.RenderScreen();

        window.requestAnimationFrame(this.Update.bind(this));
    }

    Start()
    {
        window.requestAnimationFrame(this.Update.bind(this));
        this.ClearScreen();
        //mouse.AddOnMoveHandler(this.Draw.bind(this));
        //mouse.AddOnClickHandler(this.DrawVerticalLine.bind(this));
    }

    RenderScreen()
    {
        this.canvas.WriteImageData();
    }
}
