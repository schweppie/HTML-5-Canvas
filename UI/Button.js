class Button
{
    constructor(uimanager,x, y, text, callback)
    {
        this.x = x;
        this.y = y;
        this.width = text.length * 15;
        this.height = 40;
        this.focusColor = new RGB(200,200,255);
        this.textColor = new RGB(0,0,0);
        this.color = new RGB(125,125,160);
        this.text = text;
        this.callback = callback;
        this.focus = false;
    }

    OnClick(x, y)
    {
        this.IsInBounds(x,y,this.callback);
    }

    OnFocus(x, y)
    {
        this.focus = false;
        this.IsInBounds(x,y,() => {this.focus = true});
    }

    IsInBounds(x,y,callback)
    {
        if (x >= this.x && x <= this.x + this.width)
        {
            if (y >= this.y && y <= this.y + this.height)
            {
                callback();
            }
        }
    }

    OnRender(canvas)
    {
        if (this.focus)
        {
            canvas.DrawBox(this.x, this.y, this.x+this.width, this.y+this.height, this.focusColor);
        }
        else
        {
            canvas.DrawBox(this.x, this.y, this.x+this.width, this.y+this.height, this.textColor);
        }

        canvas.DrawBox(this.x+5, this.y+5, this.x+this.width-5, this.y+this.height-5, this.color);
    }

    OnRenderText(canvas)
    {
        var ctx = canvas.getRawContext();
        ctx.font = "25px Arial";
        ctx.fillText(this.text, this.x+15, this.y+30);
    }
}