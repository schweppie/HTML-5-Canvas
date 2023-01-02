class Sprite
{
    constructor(imageData)
    {
        this.data = imageData.Data();
        this.width = imageData.Width();
        this.height = imageData.Height();

        this.position = [0,0];
        this.pivot = [Math.floor(this.width * 0.5), Math.floor(this.height * 0.5)];
        this.angle = 0.0;

        this.originColor = new RGB(255,0,0);
    }
    
    Angle()
    {
        return this.angle;
    }

    Move(x,y)
    {
        this.position = [x,y];
    }

    Rotate(angle)
    {
        this.angle = angle;
    }

    Draw(canvas)
    {
        this.DrawToCanvas(this.position[0], this.position[1], this.angle, canvas);
    }

    DrawToCanvas(x, y, angle, canvas)
    {
        var position = [x,y];
        
        
        for (let i = 0; i < this.width * this.height; i++)
        {
            var localX = (i % this.width) - this.pivot[0];
            var localY = (i / this.height)- this.pivot[1];

            // Transform
            var renderX = parseInt((localX * Math.cos(angle)) - (localY * Math.sin(angle)) + position[0]);
            var renderY = parseInt((localX * Math.sin(angle)) + (localY * Math.cos(angle)) + position[1]);
            
            canvas.DrawPixel(renderX, renderY, this.data[i]);
            
        }

        canvas.DrawLine(this.position[0]-2, this.position[1],this.position[0]+2, this.position[1],this.originColor);
        canvas.DrawLine(this.position[0], this.position[1]-2,this.position[0], this.position[1]+2,this.originColor);
    }
}