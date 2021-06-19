class UiController
{
    constructor(mouseInput, renderer)
    {
        this.buttons = [];

        mouseInput.AddOnClickHandler(this.OnClick.bind(this));
        mouseInput.AddOnMoveHandler(this.OnMove.bind(this));

        renderer.AddOnRenderHandler(this.OnRender.bind(this));
        renderer.AddOnRenderTextHandler(this.OnRenderText.bind(this));
    }

    OnClick(x, y)
    {
        for(let i=0; i< this.buttons.length;i++)
        {
            this.buttons[i].OnClick(x, y);
        }
    }

    OnMove(x, y)
    {
        for(let i=0; i< this.buttons.length;i++)
        {
            this.buttons[i].OnFocus(x, y);
        }
    }

    AddButton(x,y,text,callback)
    {
        var button = new Button(this,x,y,text,callback);
        this.buttons.push(button);
    }

    OnRender(canvas)
    {
        for(let i=0; i< this.buttons.length;i++)
        {
            this.buttons[i].OnRender(canvas);
        }
    }

    OnRenderText(canvas)
    {
        for(let i=0; i< this.buttons.length;i++)
        {
            this.buttons[i].OnRenderText(canvas);
        }
    }
}
