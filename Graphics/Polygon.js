class Polygon
{
    constructor(points)
    {
        this.shape = points;
        this.position = [0,0];
        this.angle = 0.0;
        this.worldpoints = this.shape.slice();
        this.color = new RGB(255,255,255);
        this.originColor = new RGB(255,0,0);
    }

    Position()
    {
        return this.position;
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
        this.DrawToCanvas(this.position[0], this.position[1],this.angle, canvas);
    }

    DrawAt(x, y, canvas)
    {
        this.position = [x,y];
        this.DrawToCanvas(this.position[0], this.position[1],this.angle, canvas);
    }

    DrawToCanvas(x, y, angle, canvas)
    {
        var position = [x,y];
        var points = [];

        for (let i = 0; i < this.shape.length; i++)
        {
            var x = this.shape[i][0];
            var y = this.shape[i][1];
            var point = [0,0];

            // Transform
            point[0] = parseInt((x * Math.cos(angle)) - (y * Math.sin(angle)) + position[0]);
            point[1] = parseInt((x * Math.sin(angle)) + (y * Math.cos(angle)) + position[1]);

            points.push(point);
        }

        for (let i = 0; i < points.length-1; i++)
        {
            canvas.DrawLine(points[i][0], points[i][1],points[i+1][0], points[i+1][1], this.color);
        }

        canvas.DrawLine(points[0][0], points[0][1],points[points.length-1][0], points[points.length-1][1], this.color);

        canvas.DrawLine(this.position[0]-2, this.position[1],this.position[0]+2, this.position[1],this.originColor);
        canvas.DrawLine(this.position[0], this.position[1]-2,this.position[0], this.position[1]+2,this.originColor);
    }
}