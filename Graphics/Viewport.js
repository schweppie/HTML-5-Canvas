class Viewport
{
    constructor(x, y, width, height, gridData)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.gridData = gridData;
        
        this.colorWhite = new RGB(255,255,255);
        this.colorRed = new RGB(255,0,0);

        this.fieldOfView = 3.14159 / 4;
    }
    
    Draw(canvas, position, playerAngle, debug)
    {
        for (let i = 0; i < Math.round(this.height * 0.5); i++)
        {
            let horizonHeight = this.y + Math.round(this.height * 0.5);

            let ceilColor = Math.max(10, (i * 0.5));
            let floorColor = Math.max(10, (i * 2));
            canvas.DrawLine(this.x, horizonHeight - i, this.x + this.width, horizonHeight - i, new RGB(ceilColor,ceilColor,ceilColor));
            canvas.DrawLine(this.x, horizonHeight + i, this.x + this.width, horizonHeight + i, new RGB(floorColor,floorColor,floorColor));
        }
        
        for (let i = 0; i < this.width; i++)
        {
            let angle = (playerAngle - this.fieldOfView / 2) + (i / this.width) * this.fieldOfView;
            
            let distance = 0;
            let hitWall = false;
            
            let eyeX = Math.sin(-angle);
            let eyeY = Math.cos(-angle);
            
            while (!hitWall)
            {
                distance += 0.1;
                
                let testX = Math.round((position[0] / (this.gridData.cellsize) ) + eyeX * distance);
                let testY = Math.round((position[1] / (this.gridData.cellsize)) + eyeY * distance);
                
                if (testX < 0 || testX >= this.gridData.width || testY < 0 || testY >= this.gridData.height)
                {
                    hitWall = true;
                    distance = 100;
                }
                else
                {
                    if (this.gridData.Get(testX, testY))
                    {
                        hitWall = true;
                        
                        if (debug)
                        {

                            let xto = Math.round(position[0] + ((eyeX * distance) * this.gridData.cellsize) + this.gridData.cellsize * 0.5);
                            let yto = Math.round(position[1] + ((eyeY * distance) * this.gridData.cellsize) + this.gridData.cellsize * 0.5);

                            canvas.DrawLine(Math.round(position[0]), Math.round(position[1]), xto, yto, this.colorRed);
                        }
                    }
                }
            }
            
            if (hitWall) 
            {
                let ceiling = Math.round((this.height * 0.5) - (this.height / distance));
                let floor = Math.round(this.height - ceiling);
                let x = this.x + i;
                
                let yFrom = Math.max(this.y, this.y + ceiling);
                let yTo = Math.min(this.y + this.height, this.y + floor);

                let col = Math.max(10,255 - (distance * 12));
                
                canvas.DrawLine(x,yFrom, x, yTo, new RGB(col,col,col));
            }
        }

        canvas.DrawLine(this.x, this.y, this.x + this.width, this.y, this.colorWhite);
        canvas.DrawLine(this.x, this.y, this.x, this.y + this.height, this.colorWhite);
        canvas.DrawLine(this.x, this.y + this.height, this.x + this.width, this.y + this.height, this.colorWhite);
        canvas.DrawLine(this.x + this.width, this.y, this.x + this.width, this.y + this.height, this.colorWhite);
    }
}