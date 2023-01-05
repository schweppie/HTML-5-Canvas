class Viewport
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.colorWhite = new RGB(255,255,255);
    }
    
    Draw(canvas)
    {
        canvas.DrawLine(this.x, this.y, this.x + this.width, this.y, this.colorWhite);
        canvas.DrawLine(this.x, this.y, this.x, this.y + this.height, this.colorWhite);
        canvas.DrawLine(this.x, this.y + this.height, this.x + this.width, this.y + this.height, this.colorWhite);
        canvas.DrawLine(this.x + this.width, this.y, this.x + this.width, this.y + this.height, this.colorWhite);
    }
}